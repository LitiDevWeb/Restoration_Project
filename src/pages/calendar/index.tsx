import { useMemo } from "react";
import Container from "@webapp/components/container/container";
import Navbar from "@webapp/components/navbar/navbar";
import Navigation from "@webapp/components/navigation/navigation";
import ReactCalendar from "react-calendar";
import styles from "./calendar.module.scss";
import axios from "axios";
import dayjs from "dayjs";
import { UnavailabilityType } from "@prisma/client";
import "react-calendar/dist/Calendar.css";

import isBetween from "dayjs/plugin/isBetween";
import PageTitle from "@webappcomponents/page-title/page-title";

dayjs.extend(isBetween);

const TIMESTAMP_FORMAT = "YYYY-MM-DD";

const Calendar = ({ data }: any) => {
  const checkIfUnavailable = (date: any) => {
    let unavailable = false;
    const currentDate = dayjs(date);
    const formattedCurrentDate = currentDate.format(TIMESTAMP_FORMAT);

    data.forEach((row: any) => {
      switch (row.type) {
        case UnavailabilityType.DAY:
          if (row.value.day === formattedCurrentDate) {
            unavailable = true;
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
            unavailable = true;
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
            unavailable = true;
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
            unavailable = true;
          }
          break;
        case UnavailabilityType.WEEK_END:
          if (currentDate.day() === 6 || currentDate.day() === 0) {
            unavailable = true;
          }
          break;

        default:
          break;
      }
    });

    return unavailable;
  };

  return (
    <div>
      <Navbar />
      <Container page="calendar" calculatedHeight>
        <Navigation />
        <PageTitle>
          <>
            Check out our <span>availabilities</span>
          </>
        </PageTitle>
        <div className={styles["container"]}>
          <ReactCalendar className={styles["react-calendar"]} minDate={new Date(dayjs().format(TIMESTAMP_FORMAT))} tileDisabled={(row) => checkIfUnavailable(row.date)} />
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
  const res = await axios.get("http://localhost:3000/api/unavailabilities");

  return { props: res.data };
}

export default Calendar;
