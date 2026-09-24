import { toast } from 'react-toastify';

import { site } from '@webapp/data/site';

// `tel:` and `sms:` anchors are handed over to the operating system, and some
// browsers cancel that hand-off — DevTools then shows `tel:+16022451768
// (canceled)` and the visitor sees a button that does nothing:
//
// - desktops with no softphone or linked phone app,
// - in-app browsers (Instagram, Facebook, LinkedIn …) and preview iframes that
//   block external protocols.
//
// The href itself is correct in those cases, so instead of a dead button the
// number is surfaced. The default navigation is never prevented, which keeps
// dialling on real phones exactly as it was.

const DIAL_HREF = /^(tel|sms):/i;

/** How long the dialer gets to take over the screen before we assume nothing did. */
const HANDOFF_GRACE_MS = 1200;

/** One toast per page visit — repeat clicks must not stack messages. */
const FALLBACK_TOAST_ID = 'call-fallback';

export const isDialHref = (href: string) => DIAL_HREF.test(href);

const callWasHandedOff = () => document.visibilityState !== 'visible' || !document.hasFocus();

const surfaceNumber = async () => {
  const message = `Call or text ${site.phoneDisplay} for your free estimate.`;

  try {
    await navigator.clipboard.writeText(site.phoneDisplay);

    toast.info(`${site.phoneDisplay} copied — call or text us for your free estimate.`, {
      toastId: FALLBACK_TOAST_ID,
    });
  } catch {
    // Clipboard access can be denied (permissions, insecure origin); the number is
    // still readable in the toast.
    toast.info(message, { toastId: FALLBACK_TOAST_ID });
  }
};

/** Click handler for anchors that point at `site.phoneHref` / `site.smsHref`. */
export const onDialClick = (href: string) => () => {
  if (typeof window === 'undefined' || !isDialHref(href)) return;

  window.setTimeout(() => {
    if (callWasHandedOff()) return;

    void surfaceNumber();
  }, HANDOFF_GRACE_MS);
};