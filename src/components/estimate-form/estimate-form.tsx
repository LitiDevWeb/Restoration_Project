import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { FaCheckCircle, FaExclamationTriangle, FaPhoneAlt } from 'react-icons/fa';

import CtaButton from '@webapp/components/cta/cta-button';
import CtaLink from '@webapp/components/cta/cta-link';
import { estimateProjectTypes, site } from '@webapp/data/site';
import styles from './estimate-form.module.scss';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface EstimateFormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  projectType: string;
  contactPreference: string;
  details: string;
  companyWebsite: string;
}

interface EstimateApiResponse {
  ok?: boolean;
  error?: string;
  message?: string;
  fields?: Record<string, string>;
}

const INITIAL_VALUES: EstimateFormValues = {
  name: '',
  phone: '',
  email: '',
  address: '',
  projectType: '',
  contactPreference: 'Phone call',
  details: '',
  companyWebsite: '',
};

const CONTACT_PREFERENCES = ['Phone call', 'Text message', 'Email'];

const validate = (values: EstimateFormValues) => {
  const errors: Record<string, string> = {};

  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (values.phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a phone number we can reach you on.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'That email address does not look right.';
  if (values.details.trim().length < 10) errors.details = 'Tell us a little more about the project.';

  return errors;
};

const EstimateForm = () => {
  const [values, setValues] = useState<EstimateFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const reset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus('idle');
    setMessage('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'submitting') return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setMessage('Please check the highlighted fields and try again.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const { data } = await axios.post<EstimateApiResponse>('/api/estimate', { ...values, page: '/estimate' });

      if (data.ok) {
        setStatus('success');
        setMessage(data.message ?? "Request received. We'll be in touch within one business day.");
        return;
      }

      setStatus('error');
      setMessage(data.message ?? `We could not send that automatically. Please call or text ${site.phoneDisplay}.`);
    } catch (error) {
      const fallback = `We could not send that automatically. Please call or text ${site.phoneDisplay} or email ${site.email}.`;

      if (axios.isAxiosError<EstimateApiResponse>(error)) {
        const data = error.response?.data;
        setErrors(data?.fields ?? {});
        setStatus('error');
        setMessage(data?.message ?? fallback);
        return;
      }

      setStatus('error');
      setMessage(fallback);
    }
  };

  if (status === 'success') {
    return (
      <div className={styles['success']} role="status">
        <FaCheckCircle aria-hidden="true" className={styles['success-icon']} size={26} />
        <h3 className={styles['success-title']}>Request received</h3>
        <p className={styles['success-message']}>{message}</p>
        <ul className={styles['success-steps']}>
          <li>We review your details and confirm the address and scope.</li>
          <li>Fennec calls or texts you back to book the free walkthrough.</li>
          <li>You get a written, itemized estimate before anything is scheduled.</li>
        </ul>
        <div className={styles['success-actions']}>
          <CtaLink href={site.phoneHref}>
            <FaPhoneAlt aria-hidden="true" size={12} /> Call {site.phoneDisplay}
          </CtaLink>
          <CtaButton onClick={reset} variant="outline">
            Send another request
          </CtaButton>
        </div>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <form className={styles['form']} noValidate onSubmit={handleSubmit}>
      <div className={styles['row']}>
        <label className={styles['field']} htmlFor="estimate-name">
          <span className={styles['label']}>
            Full name <span className={styles['required']}>*</span>
          </span>
          <input
            aria-describedby={errors.name ? 'estimate-name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className={classNames(styles['input'], { [styles['input-error']]: errors.name })}
            id="estimate-name"
            name="name"
            onChange={update}
            placeholder="Jordan Rivera"
            type="text"
            value={values.name}
          />
          {errors.name && (
            <span className={styles['error']} id="estimate-name-error">
              {errors.name}
            </span>
          )}
        </label>

        <label className={styles['field']} htmlFor="estimate-phone">
          <span className={styles['label']}>
            Phone <span className={styles['required']}>*</span>
          </span>
          <input
            aria-describedby={errors.phone ? 'estimate-phone-error' : undefined}
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            className={classNames(styles['input'], { [styles['input-error']]: errors.phone })}
            id="estimate-phone"
            name="phone"
            onChange={update}
            placeholder="(602) 000-0000"
            type="tel"
            value={values.phone}
          />
          {errors.phone && (
            <span className={styles['error']} id="estimate-phone-error">
              {errors.phone}
            </span>
          )}
        </label>
      </div>
      <div className={styles['row']}>
        <label className={styles['field']} htmlFor="estimate-email">
          <span className={styles['label']}>Email</span>
          <input
            aria-describedby={errors.email ? 'estimate-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={classNames(styles['input'], { [styles['input-error']]: errors.email })}
            id="estimate-email"
            name="email"
            onChange={update}
            placeholder="you@example.com"
            type="email"
            value={values.email}
          />
          {errors.email && (
            <span className={styles['error']} id="estimate-email-error">
              {errors.email}
            </span>
          )}
        </label>

        <label className={styles['field']} htmlFor="estimate-address">
          <span className={styles['label']}>Project address or area</span>
          <input
            autoComplete="street-address"
            className={styles['input']}
            id="estimate-address"
            name="address"
            onChange={update}
            placeholder="Street, cross streets or neighborhood"
            type="text"
            value={values.address}
          />
        </label>
      </div>

      <div className={styles['row']}>
        <label className={styles['field']} htmlFor="estimate-project-type">
          <span className={styles['label']}>Project type</span>
          <select
            className={classNames(styles['input'], styles['select'])}
            id="estimate-project-type"
            name="projectType"
            onChange={update}
            value={values.projectType}
          >
            <option value="">Select a project type</option>
            {estimateProjectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <fieldset className={styles['fieldset']}>
          <legend className={styles['label']}>Preferred contact</legend>
          <div className={styles['radios']}>
            {CONTACT_PREFERENCES.map((preference) => (
              <label className={styles['radio']} key={preference}>
                <input
                  checked={values.contactPreference === preference}
                  name="contactPreference"
                  onChange={update}
                  type="radio"
                  value={preference}
                />
                <span>{preference}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <label className={styles['field']} htmlFor="estimate-details">
        <span className={styles['label']}>
          Tell us about the project <span className={styles['required']}>*</span>
        </span>
        <textarea
          aria-describedby={errors.details ? 'estimate-details-error' : 'estimate-details-hint'}
          aria-invalid={Boolean(errors.details)}
          className={classNames(styles['input'], styles['textarea'], { [styles['input-error']]: errors.details })}
          id="estimate-details"
          maxLength={3000}
          name="details"
          onChange={update}
          placeholder="Rooms involved, what you want changed, rough timeline, whether permits are needed, and anything already quoted."
          rows={5}
          value={values.details}
        />
        {errors.details ? (
          <span className={styles['error']} id="estimate-details-error">
            {errors.details}
          </span>
        ) : (
          <span className={styles['hint']} id="estimate-details-hint">
            The more detail you give, the more accurate the first estimate will be.
          </span>
        )}
      </label>

      <div aria-hidden="true" className={styles['honeypot']}>
        <label htmlFor="estimate-company">Company website</label>
        <input
          autoComplete="off"
          id="estimate-company"
          name="companyWebsite"
          onChange={update}
          tabIndex={-1}
          type="text"
          value={values.companyWebsite}
        />
      </div>

      {status === 'error' && message && (
        <p className={styles['alert']} role="alert">
          <FaExclamationTriangle aria-hidden="true" size={13} />
          <span>{message}</span>
        </p>
      )}

      <div className={styles['submit-row']}>
        <CtaButton block loading={isSubmitting} type="submit" variant="dark">
          {isSubmitting ? 'Sending your request…' : 'Request my free estimate'}
        </CtaButton>
        <p className={styles['note']}>
          Fields marked <span className={styles['required']}>*</span> are required. Your details go to Fennec
          Restoration only — we do not sell or share them.
        </p>
      </div>
    </form>
  );
};

export default EstimateForm;
