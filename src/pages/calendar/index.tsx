import { memo } from "react";
import Container from "@webapp/components/container/container";
import Navbar from "@webapp/components/navbar/navbar";
import Navigation from "@webapp/components/navigation/navigation";
import ReactCalendar from "react-calendar";
import styles from "./calendar.module.scss";
import isBetween from "dayjs/plugin/isBetween";
import PageTitle from "@webapp/components/page-title/page-title";
import axios from "axios";
import dayjs from "dayjs";

import { UnavailabilityType } from "@prisma/client";
import { API_URL } from "@webapp/constants";

dayjs.extend(isBetween);

const TIMESTAMP_FORMAT = "YYYY-MM-DD";

const Calendar = ({ data }: any) => {
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

  return (
    <div>
      <Navbar />
      <Container page="calendar" moreCalculatedHeight>
        <Navigation />
        <PageTitle>
          <>
            Check out our <span>availabilities</span>
          </>
        </PageTitle>
        <div className={styles["container"]}>
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
      </Container>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(API_URL + "/api/unavailabilities");

  return { props: res.data };
}

export default memo(Calendar);
