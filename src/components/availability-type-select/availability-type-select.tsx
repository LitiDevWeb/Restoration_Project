import React from "react";
import styles from "./availability-type-select.module.scss";

import { MdOutlineToday, MdOutlineCalendarViewWeek, MdOutlineCalendarMonth, MdOutlineDashboardCustomize } from "react-icons/md";
import { UnavailabilityType } from "@prisma/client";
import classNames from "classnames";

interface AvailabilityTypeSelectProps {
  value: UnavailabilityType;
  onChange: (value: UnavailabilityType) => void;
}

const AvailabilityTypeSelect = ({ value = UnavailabilityType.DAY, onChange }: AvailabilityTypeSelectProps) => {
  return (
    <div className={styles["container"]}>
      <div className={classNames(styles["line"], { [styles["line-active"]]: value === UnavailabilityType.DAY })} onClick={() => onChange(UnavailabilityType.DAY)}>
        <MdOutlineToday />
        <p>Day</p>
      </div>
      <div className={classNames(styles["line"], { [styles["line-active"]]: value === UnavailabilityType.WEEK })} onClick={() => onChange(UnavailabilityType.WEEK)}>
        <MdOutlineCalendarViewWeek />
        <p>Week</p>
      </div>
      <div className={classNames(styles["line"], { [styles["line-active"]]: value === UnavailabilityType.MONTH })} onClick={() => onChange(UnavailabilityType.MONTH)}>
        <MdOutlineCalendarMonth />
        <p>Month</p>
      </div>
      <div className={classNames(styles["line"], { [styles["line-active"]]: value === UnavailabilityType.FROM_TO })} onClick={() => onChange(UnavailabilityType.FROM_TO)}>
        <MdOutlineDashboardCustomize />
        <p>Custom</p>
      </div>
    </div>
  );
};

export default AvailabilityTypeSelect;
