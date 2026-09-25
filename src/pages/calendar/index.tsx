import type { GetServerSideProps } from 'next';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import ReactCalendar from 'react-calendar';
import { FaEnvelope } from 'react-icons/fa';

import CtaBand from '@webapp/components/cta-band/cta-band';
import CtaLink from '@webapp/components/cta/cta-link';
import Layout from '@webapp/components/layout/layout';
import PageHero from '@webapp/components/page-hero/page-hero';
import Seo from '@webapp/components/seo/seo';
import { breadcrumbSchema, localBusinessSchema } from '@webapp/data/schema';
import { site } from '@webapp/data/site';
import { isUnavailabilityType, parseUnavailabilityValue } from '@webapp/types/unavailability';
import type { Unavailability } from '@webapp/types/unavailability';
import heroImage from '@images/design.png';
import styles from './calendar.module.scss';

dayjs.extend(isBetween);

const TIMESTAMP_FORMAT = 'YYYY-MM-DD';

interface CalendarProps {
  unavailabilities: Unavailability[];
}

/** The API hands back the stored JSON payload, so every field is narrowed before it reaches the calendar. */
const normalize = (rows: unknown): Unavailability[] => {
  if (!Array.isArray(rows)) return [];

  return rows.flatMap((row) => {
    if (typeof row !== 'object' || row === null) return [];

    const record = row as Record<string, unknown>;

    return [
      {
        id: typeof record.id === 'number' ? record.id : 0,
        type: isUnavailabilityType(record.type) ? record.type : 'DAY',
        value: parseUnavailabilityValue(record.value),
      },
    ];
  });
};

/** Mirrors the booking rules stored in the admin calendar: single days, weeks, months, ranges and weekends. */
const isUnavailable = (date: Date, rows: Unavailability[]) => {
  const currentDate = dayjs(date);
  const current = currentDate.format(TIMESTAMP_FORMAT);

  return rows.some((row) => {
    const { day, from, to } = row.value;

    switch (row.type) {
      case 'DAY':
        return day === current;
      case 'WEEK':
      case 'MONTH':
      case 'FROM_TO':
        if (!from || !to) return false;

        return currentDate.isBetween(
          dayjs(from).subtract(1, 'day').format(TIMESTAMP_FORMAT),
          dayjs(to).add(1, 'day').format(TIMESTAMP_FORMAT),
          'day'
        );
      case 'WEEK_END':
        return currentDate.day() === 0 || currentDate.day() === 6;
      default:
        return false;
    }
  });
};

const Calendar = ({ unavailabilities }: CalendarProps) => (
  <Layout>
    <Seo
      description={`Check Fennec Restoration availability before you plan your remodel, addition or repair. Licensed Phoenix Valley general contractor, ROC ${site.roc} — call or text ${site.phoneDisplay} to confirm a start date.`}
      image="/images/miscellaneous/E2.jpg"
      path="/calendar"
      structuredData={[
        localBusinessSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/home' },
          { name: 'Availability', path: '/calendar' },
        ]),
      ]}
      title="Crew Availability & Scheduling"
    />

    <PageHero
      eyebrow="Scheduling"
      image={heroImage}
      imageAlt="Completed exterior work photographed on a Fennec Restoration job site in the Phoenix Valley"
      lede="Highlighted days are already committed to scheduled Fennec crews. Pick a range that looks open, then confirm it with us — availability moves as jobs are approved."
      showCta={false}
      title={
        <>
          Check our <span>availability</span>
        </>
      }
    />

    <section className={styles['section']}>
      <div className={styles['inner']}>
        <div className={styles['board']}>
          <ReactCalendar
            className={styles['calendar']}
            locale="en"
            minDate={new Date(dayjs().format(TIMESTAMP_FORMAT))}
            tileDisabled={({ date }) => isUnavailable(date, unavailabilities)}
          />

          <ul className={styles['legend']}>
            <li>
              <span aria-hidden="true" className={styles['dot-available']} />
              Open — no crew committed
            </li>
            <li>
              <span aria-hidden="true" className={styles['dot-booked']} />
              Booked — crew already scheduled
            </li>
          </ul>
        </div>

        <div className={styles['side']}>
          <p className={styles['eyebrow']}>How to read this</p>
          <h2 className={styles['title']}>
            Availability is a guide, <span>not a promise</span>
          </h2>
          <p className={styles['text']}>
            The calendar reflects jobs the office has already confirmed. Dates can open or close between your visit and
            your call, so always confirm before you order materials or book time off work.
          </p>

          <ul className={styles['notes']}>
            <li>Booked days mean crews are on a committed job — they are not a refusal.</li>
            <li>Call with your target start date and we will match it to the schedule.</li>
            <li>Emergency repair and restoration work is scheduled outside the calendar — call us directly.</li>
          </ul>

          <div className={styles['actions']}>
            <CtaLink href={site.phoneHref} size="md">
              Call for estimate
            </CtaLink>
 <CtaLink className={styles['actionEmail']} href={site.emailHref} size="md" variant="outlineDark">
 <FaEnvelope aria-hidden="true" size={14} />
 {site.email}
 </CtaLink>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      title={
        <>
          Have a start date in mind? <span>Let&apos;s check it together.</span>
        </>
      }
    />
  </Layout>
);

export const getServerSideProps: GetServerSideProps<CalendarProps> = async ({ req }) => {
  const host = req.headers.host ?? new URL(site.url).host;
  const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https';

  try {
    const response = await axios.get(`${protocol}://${host}/api/unavailabilities`, { timeout: 8000 });
    const payload = (response.data as { data?: unknown } | undefined)?.data;

    return { props: { unavailabilities: normalize(payload) } };
  } catch {
    // A calendar outage must never take the page down: show an empty month and keep the calls to action.
    return { props: { unavailabilities: [] } };
  }
};

export default Calendar;
