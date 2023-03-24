import { memo, useState, useEffect } from "react";
import Container from "@webapp/components/container/container";
import Navbar from "@webapp/components/navbar/navbar";
import ReactCalendar from "react-calendar";
import styles from "./admin.module.scss";
import isBetween from "dayjs/plugin/isBetween";
import axios from "axios";
import dayjs from "dayjs";
import { Unavailabilities, UnavailabilityType } from "@prisma/client";
import { API_URL } from "@webapp/constants";
import { DisableWeekEnd, UnavailablesDayBox, UnavailablesMonthBox, UnavailablesWeekBox } from "@webapp/components/unavailable-boxes/unavailables-boxes";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Modal from "react-modal";
import AvailabilityForm from "@webapp/components/availability-form/availability-form";
import Login from "@webapp/components/Login/login";
import Toggle from "react-toggle";

dayjs.extend(isBetween);

const TIMESTAMP_FORMAT = "YYYY-MM-DD";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Admin = ({ data }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<String | null>(null);

  const daysUnavailabilities: Unavailabilities[] = [];
  const weeksUnavailabilities: Unavailabilities[] = [];
  const monthsUnavailabilities: Unavailabilities[] = [];
  const fromToUnavailabilities: Unavailabilities[] = [];
  const weekEndsUnavailabilities: Unavailabilities[] = [];

  data.forEach((row: Unavailabilities) => {
    switch (row.type) {
      case UnavailabilityType.DAY:
        daysUnavailabilities.push(row);
        break;
      case UnavailabilityType.WEEK:
        weeksUnavailabilities.push(row);
        break;
      case UnavailabilityType.MONTH:
        monthsUnavailabilities.push(row);
        break;
      case UnavailabilityType.FROM_TO:
        fromToUnavailabilities.push(row);
        break;
      case UnavailabilityType.WEEK_END:
        weekEndsUnavailabilities.push(row);
        break;

      default:
        break;
    }
  });

  const checkIfUnavailable = (date: any) => {
    const currentDate = dayjs(date);
    const formattedCurrentDate = currentDate.format(TIMESTAMP_FORMAT);

    for (const row of data) {
      switch (row.type) {
        case UnavailabilityType.DAY:
          if (row.value.day === formattedCurrentDate) {
            return true;
          }
          break;
        case UnavailabilityType.WEEK:
          if (
            dayjs(formattedCurrentDate).isBetween(
              dayjs(row.value.from).subtract(1, "day").format(TIMESTAMP_FORMAT),
              dayjs(row.value.to).add(1, "day").format(TIMESTAMP_FORMAT),
              "day"
            )
          ) {
            return true;
          }
          break;
        case UnavailabilityType.MONTH:
          if (
            dayjs(formattedCurrentDate).isBetween(
              dayjs(row.value.from).subtract(1, "day").format(TIMESTAMP_FORMAT),
              dayjs(row.value.to).add(1, "day").format(TIMESTAMP_FORMAT),
              "day"
            )
          ) {
            return true;
          }
          break;
        case UnavailabilityType.FROM_TO:
          if (
            dayjs(formattedCurrentDate).isBetween(
              dayjs(row.value.from).subtract(1, "day").format(TIMESTAMP_FORMAT),
              dayjs(row.value.to).add(1, "day").format(TIMESTAMP_FORMAT),
              "day"
            )
          ) {
            return true;
          }
          break;
        case UnavailabilityType.WEEK_END:
          if (currentDate.day() === 6 || currentDate.day() === 0) {
            return true;
          }
          break;

        default:
          break;
      }
    }

    return false;
  };

  const onDelete = async (unavailability: Unavailabilities) => {
    const confirm = window.confirm(`Do you really want to delete that unavailability ?`);

    if (confirm) {
      try {
        const res = await axios.delete(`${API_URL}/api/unavailabilities?id=${unavailability.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 200) {
          router.replace(router.asPath);

          toast.success("Unavailability successfully delete.");
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error("Something went wrong, please try again later or contact support.");
      }
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
        }
      );

      if (res.status === 200) {
        router.replace(router.asPath);
        toast.success("Weekends Availabilities Updated.");
        setLoading(false);
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong, please try again later or contact support.");
      setLoading(false);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    setAccessToken(accessToken);
  }, []);

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <AvailabilityForm closeModal={() => closeModal()} />
      </Modal>
      <Navbar />
      <Container page="calendar" moreCalculatedHeight>
        <div className={styles["container"]}>
          {accessToken ? (
            <>
              <div>
                <ReactCalendar
                  className={styles["react-calendar"]}
                  minDate={new Date(dayjs().format(TIMESTAMP_FORMAT))}
                  tileDisabled={(row) => checkIfUnavailable(row.date)}
                  locale={"en"}
                />
                <div className={styles["calendar-hint"]}>
                  <div className={styles["hint-line"]}>
                    <div className={styles["available-circle"]}></div>
                    <p>Available</p>
                  </div>
                  <div className={styles["hint-line"]}>
                    <div className={styles["not-available-circle"]}></div>
                    <p>Not Available</p>
                  </div>
                </div>
              </div>
              <div className={classNames(styles["calendar-form"], "scrollbar")}>
                <div>
                  <p className={styles["update-title"]}>Update Calendar Values</p>
                  <div className={styles["days"]}>
                    {daysUnavailabilities.length > 0 && (
                      <>
                        <p className={styles["days-title"]}>UNAVAILABLE DAYS :</p>
                        <div className={styles["days-container"]}>
                          {daysUnavailabilities.map((row: Unavailabilities) => (
                            <UnavailablesDayBox key={row.id} unavailability={row} onDelete={onDelete} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles["weeks"]}>
                    {weeksUnavailabilities.length > 0 && (
                      <>
                        <p className={styles["weeks-title"]}>UNAVAILABLE WEEKS :</p>
                        <div className={styles["weeks-container"]}>
                          {weeksUnavailabilities.map((row: Unavailabilities) => (
                            <UnavailablesWeekBox key={row.id} unavailability={row} onDelete={onDelete} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles["months"]}>
                    {monthsUnavailabilities.length > 0 && (
                      <>
                        <p className={styles["months-title"]}>UNAVAILABLE MONTHS :</p>
                        {monthsUnavailabilities.map((row: Unavailabilities) => (
                          <UnavailablesMonthBox key={row.id} unavailability={row} onDelete={onDelete} />
                        ))}
                      </>
                    )}
                  </div>
                  <div className={styles["months"]}>
                    {fromToUnavailabilities.length > 0 && (
                      <>
                        <p className={styles["months-title"]}>CUSTOM :</p>
                        {fromToUnavailabilities.map((row: Unavailabilities) => (
                          <UnavailablesMonthBox key={row.id} unavailability={row} onDelete={onDelete} />
                        ))}
                      </>
                    )}
                  </div>
                  <div className={styles["week-ends"]}>
                    <label>Unavailable in week ends</label>
                    <Toggle id="cheese-status" disabled={loading} checked={weekEndsUnavailabilities.length > 0} onChange={toggleWeekend} />
                  </div>
                </div>
                <div className={styles["buttons"]}>
                  <button onClick={openModal}>Add Unavailability</button>
                </div>
              </div>
            </>
          ) : (
            <Login />
          )}
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(API_URL + "/api/unavailabilities");

  return { props: res.data };
}

export default memo(Admin);
