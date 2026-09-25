import type { GetServerSidePropsContext } from "next";
import type { ComponentType, ReactNode } from "react";
import { memo, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import classNames from "classnames";
import ReactCalendar from "react-calendar";
import Modal from "react-modal";
import type { Styles } from "react-modal";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FaCalendarPlus, FaExternalLinkAlt } from "react-icons/fa";
import {
  MdOutlineToday,
  MdOutlineCalendarViewWeek,
  MdOutlineCalendarMonth,
  MdOutlineDashboardCustomize,
} from "react-icons/md";

import AvailabilityForm from "@webapp/components/availability-form/availability-form";
import Button from "@webapp/components/button/button";
import Login from "@webapp/components/Login/login";
import Navbar from "@webapp/components/navbar/navbar";
import {
  UnavailablesDayBox,
  UnavailablesFromToBox,
  UnavailablesMonthBox,
  UnavailablesWeekBox,
} from "@webapp/components/unavailable-boxes/unavailables-boxes";
import { API_URL, REQUEST_TIMEOUT } from "@webapp/constants";
import { getServerApiUrl } from "@webapp/helpers/getServerApiUrl";
import { UnavailabilityType } from "@webapp/types/unavailability";
import type { Unavailability } from "@webapp/types/unavailability";
import styles from "./admin.module.scss";

dayjs.extend(isBetween);

const TIMESTAMP_FORMAT = "YYYY-MM-DD";

interface AdminProps {
  data: Unavailability[];
  loadError?: string | null;
}

interface BoxProps {
  unavailability: Unavailability;
  onDelete: (unavailability: Unavailability) => void;
}

interface Group {
  key: string;
  label: string;
  icon: ReactNode;
  rows: Unavailability[];
  Box: ComponentType<BoxProps>;
}

/** Replaces react-modal's default box with a card that matches the admin surfaces. */
const modalStyles: Styles = {
  overlay: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "4rem 1.25rem 2rem",
    overflowY: "auto",
    backgroundColor: "rgba(9, 11, 13, 0.72)",
    zIndex: 200,
  },
  content: {
    position: "relative",
    inset: "auto",
    width: "100%",
    maxWidth: "44rem",
    padding: "2rem",
    border: "1px solid #e6e0d6",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    boxShadow: "0 28px 60px rgba(9, 11, 13, 0.28)",
  },
};

const Admin = ({ data, loadError = null }: AdminProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // react-modal needs a root element to hide from assistive tech; #__next is the Next.js app root.
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  useEffect(() => {
    setAccessToken(window.localStorage.getItem("accessToken"));
  }, []);

  const rows: Unavailability[] = Array.isArray(data) ? data : [];

  const groupOf = (type: UnavailabilityType) => rows.filter((row) => row.type === type);

  const daysUnavailabilities = groupOf(UnavailabilityType.DAY);
  const weeksUnavailabilities = groupOf(UnavailabilityType.WEEK);
  const monthsUnavailabilities = groupOf(UnavailabilityType.MONTH);
  const fromToUnavailabilities = groupOf(UnavailabilityType.FROM_TO);
  const weekEndsUnavailabilities = groupOf(UnavailabilityType.WEEK_END);

  const weekendsBlocked = weekEndsUnavailabilities.length > 0;
  const blockedCount = daysUnavailabilities.length + weeksUnavailabilities.length + monthsUnavailabilities.length + fromToUnavailabilities.length;

  const isBetweenRange = (row: Unavailability, date: string) =>
    dayjs(date).isBetween(
      dayjs(row.value.from).subtract(1, "day").format(TIMESTAMP_FORMAT),
      dayjs(row.value.to).add(1, "day").format(TIMESTAMP_FORMAT),
      "day"
    );

  const checkIfUnavailable = (date: any) => {
    const currentDate = dayjs(date);
    const formattedCurrentDate = currentDate.format(TIMESTAMP_FORMAT);

    for (const row of rows) {
      switch (row.type) {
        case UnavailabilityType.DAY:
          if (row.value.day === formattedCurrentDate) return true;
          break;
        case UnavailabilityType.WEEK:
        case UnavailabilityType.MONTH:
        case UnavailabilityType.FROM_TO:
          if (isBetweenRange(row, formattedCurrentDate)) return true;
          break;
        case UnavailabilityType.WEEK_END:
          if (currentDate.day() === 6 || currentDate.day() === 0) return true;
          break;

        default:
          break;
      }
    }

    return false;
  };

  const onDelete = async (unavailability: Unavailability) => {
    const confirm = window.confirm("Do you really want to delete that unavailability?");

    if (!confirm) return;

    setLoading(true);

    try {
      const res = await axios.delete(`${API_URL}/api/unavailabilities?id=${unavailability.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: REQUEST_TIMEOUT,
      });

      if (res.status === 200) {
        router.replace(router.asPath);

        toast.success("Unavailability successfully deleted.");
        return;
      }

      toast.error(res.data.message);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err?.code === "ECONNABORTED") {
        toast.error("The server took too long to answer. Please try again in a moment.");
      } else {
        toast.error("Something went wrong, please try again later or contact support.");
      }
    } finally {
      // Always released so the controls can never stay stuck in their loading state.
      setLoading(false);
    }
  };

  const toggleWeekend = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/unavailabilities`,
        { type: UnavailabilityType.WEEK_END, value: {} },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: REQUEST_TIMEOUT,
        }
      );

      if (res.status === 200) {
        router.replace(router.asPath);
        toast.success("Weekends availabilities updated.");
        return;
      }

      toast.error(res.data.message);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err?.code === "ECONNABORTED") {
        toast.error("The server took too long to answer. Please try again in a moment.");
      } else {
        toast.error("Something went wrong, please try again later or contact support.");
      }
    } finally {
      // Always released so the weekend switch can never stay stuck in its loading state.
      setLoading(false);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const allGroups: Group[] = [
    { key: "days", label: "Blocked days", icon: <MdOutlineToday />, rows: daysUnavailabilities, Box: UnavailablesDayBox },
    { key: "weeks", label: "Blocked weeks", icon: <MdOutlineCalendarViewWeek />, rows: weeksUnavailabilities, Box: UnavailablesWeekBox },
    { key: "months", label: "Blocked months", icon: <MdOutlineCalendarMonth />, rows: monthsUnavailabilities, Box: UnavailablesMonthBox },
    { key: "ranges", label: "Custom ranges", icon: <MdOutlineDashboardCustomize />, rows: fromToUnavailabilities, Box: UnavailablesFromToBox },
  ];

  const groups = allGroups.filter((group) => group.rows.length > 0);

  return (
    <div className={styles["page"]}>
      <Modal
        contentLabel="Add an unavailability to the calendar"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick
        style={modalStyles}
      >
        <AvailabilityForm closeModal={() => closeModal()} />
      </Modal>

      <Navbar />

      <main className={styles["main"]}>
        {accessToken ? (
          <>
            <section className={styles["intro"]}>
              <div className={styles["intro-inner"]}>
                <p className={styles["eyebrow"]}>Scheduling admin</p>
                <h1 className={styles["title"]}>
                  Crew <span>availability</span>
                </h1>
                <p className={styles["lede"]}>
                  Block the days your crews are already committed to and the public calendar updates instantly.
                  Everything saved here is what visitors see on the availability page before they call.
                </p>

                <ul className={styles["stats"]}>
                  <li>
                    <span className={styles["stat-value"]}>{daysUnavailabilities.length}</span>
                    <span className={styles["stat-label"]}>Blocked days</span>
                  </li>
                  <li>
                    <span className={styles["stat-value"]}>{weeksUnavailabilities.length}</span>
                    <span className={styles["stat-label"]}>Blocked weeks</span>
                  </li>
                  <li>
                    <span className={styles["stat-value"]}>{monthsUnavailabilities.length}</span>
                    <span className={styles["stat-label"]}>Blocked months</span>
                  </li>
                  <li>
                    <span className={styles["stat-value"]}>{fromToUnavailabilities.length}</span>
                    <span className={styles["stat-label"]}>Custom ranges</span>
                  </li>
                  <li>
                    <span className={styles["stat-value-status"]}>{weekendsBlocked ? "Closed" : "Open"}</span>
                    <span className={styles["stat-label"]}>Weekends</span>
                  </li>
                </ul>

                {loadError && <p className={styles["alert"]}>{loadError}</p>}
              </div>
            </section>

            <section className={styles["workspace"]}>
              <div className={styles["workspace-inner"]}>
                <div className={styles["board"]}>
                  <ReactCalendar
                    className={styles["calendar"]}
                    locale="en"
                    minDate={new Date(dayjs().format(TIMESTAMP_FORMAT))}
                    tileDisabled={(row) => checkIfUnavailable(row.date)}
                  />

                  <ul className={styles["legend"]}>
                    <li>
                      <span aria-hidden="true" className={styles["dot-available"]} />
                      Open — no crew committed
                    </li>
                    <li>
                      <span aria-hidden="true" className={styles["dot-booked"]} />
                      Blocked — crew already scheduled
                    </li>
                  </ul>
                </div>

                <aside className={styles["panel"]}>
                  <header className={styles["panel-head"]}>
                    <div>
                      <p className={styles["panel-eyebrow"]}>Calendar values</p>
                      <h2 className={styles["panel-title"]}>Manage unavailability</h2>
                    </div>

                    <Button icon={<FaCalendarPlus aria-hidden="true" />} label="Add" onClick={openModal} />
                  </header>

                  <div className={styles["switch-row"]}>
                    <div>
                      <p className={styles["switch-title"]}>Unavailable on weekends</p>
                      <p className={styles["switch-hint"]}>Blocks every Saturday and Sunday on the public calendar.</p>
                    </div>

                    <button
                      aria-checked={weekendsBlocked}
                      aria-label="Block weekends on the public calendar"
                      className={classNames(styles["switch"], { [styles["switch-on"]]: weekendsBlocked })}
                      disabled={loading}
                      onClick={toggleWeekend}
                      role="switch"
                      type="button"
                    >
                      <span aria-hidden="true" className={styles["switch-thumb"]} />
                    </button>
                  </div>

                  {groups.length > 0 ? (
                    <div className={styles["groups"]}>
                      {groups.map((group) => (
                        <section className={styles["group"]} key={group.key}>
                          <p className={styles["group-title"]}>
                            <span aria-hidden="true" className={styles["group-icon"]}>
                              {group.icon}
                            </span>
                            {group.label}
                            <span className={styles["group-count"]}>{group.rows.length}</span>
                          </p>

                          <ul className={styles["list"]}>
                            {group.rows.map((row) => (
                              <group.Box key={row.id} onDelete={onDelete} unavailability={row} />
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <p className={styles["empty"]}>
                      Nothing is blocked yet. Add a day, a week, a month or a custom range and it shows up here.
                    </p>
                  )}

                  <footer className={styles["panel-foot"]}>
                    <span>
                      {blockedCount} {blockedCount === 1 ? "entry" : "entries"}
                    </span>
                    <Link className={styles["preview-link"]} href="/calendar">
                      View the public calendar
                      <FaExternalLinkAlt aria-hidden="true" size={10} />
                    </Link>
                  </footer>
                </aside>
              </div>
            </section>
          </>
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    // Server-side fetches need an absolute origin: it is rebuilt from the request,
    // so the admin also loads when the app is not served from the production domain.
    const res = await axios.get(`${getServerApiUrl(req.headers)}/api/unavailabilities`, { timeout: REQUEST_TIMEOUT });

    return { props: { data: Array.isArray(res.data?.data) ? res.data.data : [], loadError: null } };
  } catch (err) {
    // The admin has to stay reachable even when the availability service is down.
    return {
      props: {
        data: [],
        loadError:
          "The availability service is unreachable right now. Reload the page in a moment, or contact support if it keeps failing.",
      },
    };
  }
}

export default memo(Admin);

