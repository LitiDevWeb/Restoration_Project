import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { site } from '@webapp/data/site';

/**
 * Estimate request endpoint.
 *
 * The submission is forwarded to whichever transport is configured through
 * environment variables — first match wins:
 *
 *   WEB3FORMS_ACCESS_KEY   → https://api.web3forms.com/submit (email delivery)
 *   FORMSPREE_FORM_ID      → https://formspree.io/f/<id>       (email delivery)
 *   ESTIMATE_WEBHOOK_URL   → any JSON webhook (Zapier, Make, CRM, Slack…)
 *
 * If none of them is configured the route returns 503 with the direct phone and
 * email instead of pretending the message was delivered. The form mirrors that
 * response, so a visitor is never shown a false success state.
 */

type EstimateResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
  fields?: Record<string, string>;
  transport?: string;
};

const MAX_LENGTHS = {
  name: 120,
  phone: 40,
  email: 160,
  address: 200,
  projectType: 80,
  contactPreference: 20,
  details: 3000,
} as const;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const rateLimiter = new Map<string, number[]>();

const isRateLimited = (key: string) => {
  const now = Date.now();
  const hits = (rateLimiter.get(key) ?? []).filter((time) => now - time < RATE_WINDOW_MS);

  hits.push(now);
  rateLimiter.set(key, hits);

  return hits.length > RATE_MAX_REQUESTS;
};

const readString = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
const isPhone = (value: string) => value.replace(/\D/g, '').length >= 10;

const delivery = async (payload: Record<string, string>): Promise<string | null> => {
  const web3forms = process.env.WEB3FORMS_ACCESS_KEY;

  if (web3forms) {
    const response = await axios.post(
      'https://api.web3forms.com/submit',
      {
        access_key: web3forms,
        subject: `New estimate request — ${payload.projectType || 'General project'}`,
        from_name: `${site.name} website`,
        replyto: payload.email,
        ...payload,
      },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, timeout: 12000 }
    );

    if (response.data?.success === false) throw new Error('Web3Forms rejected the submission');

    return 'web3forms';
  }

  const formspree = process.env.FORMSPREE_FORM_ID;

  if (formspree) {
    await axios.post(`https://formspree.io/f/${formspree}`, payload, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      timeout: 12000,
    });

    return 'formspree';
  }

  const webhook = process.env.ESTIMATE_WEBHOOK_URL;

  if (webhook) {
    await axios.post(
      webhook,
      { ...payload, submittedAt: new Date().toISOString(), source: site.url },
      { timeout: 12000 }
    );

    return 'webhook';
  }

  return null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<EstimateResponse>) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');

    return res.status(405).json({ error: 'method_not_allowed', message: 'This endpoint only accepts POST requests.' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'rate_limited',
      message: `Too many requests from this connection. Please call or text ${site.phoneDisplay} instead.`,
    });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill hidden fields, humans never see them.
  if (readString(body.companyWebsite, 200)) {
    return res.status(400).json({ error: 'spam_detected', message: 'This submission was rejected.' });
  }

  const name = readString(body.name, MAX_LENGTHS.name);
  const phone = readString(body.phone, MAX_LENGTHS.phone);
  const email = readString(body.email, MAX_LENGTHS.email);
  const address = readString(body.address, MAX_LENGTHS.address);
  const projectType = readString(body.projectType, MAX_LENGTHS.projectType);
  const contactPreference = readString(body.contactPreference, MAX_LENGTHS.contactPreference) || 'Phone call';
  const details = readString(body.details, MAX_LENGTHS.details);

  const fields: Record<string, string> = {};

  if (name.length < 2) fields.name = 'Please enter your name.';
  if (!isPhone(phone)) fields.phone = 'Please enter a phone number we can reach you on.';
  if (email && !isEmail(email)) fields.email = 'That email address does not look right.';
  if (details.length < 10) fields.details = 'Tell us a little more about the project (at least 10 characters).';

  if (Object.keys(fields).length > 0) {
    return res.status(400).json({ error: 'validation_failed', message: 'Please check the highlighted fields.', fields });
  }

  const payload: Record<string, string> = {
    name,
    phone,
    email: email || 'Not provided',
    address: address || 'Not provided',
    projectType: projectType || 'Not specified',
    contactPreference,
    details,
    page: readString(body.page, 200) || '/estimate',
    submittedAt: new Date().toISOString(),
  };

  try {
    const transport = await delivery(payload);

    if (!transport) {
      return res.status(503).json({
        error: 'not_configured',
        message: `Our online form is not connected to a mailbox yet. Please call or text ${site.phoneDisplay} or email ${site.email} and we will take your details directly.`,
      });
    }

    return res
      .status(200)
      .json({ ok: true, transport, message: "Request received. We'll be in touch within one business day." });
  } catch (error) {
    console.error('[api/estimate] delivery failed', error);

    return res.status(502).json({
      error: 'delivery_failed',
      message: `Something went wrong while sending your request. Please call or text ${site.phoneDisplay} or email ${site.email} so we do not miss you.`,
    });
  }
};

export default handler;
