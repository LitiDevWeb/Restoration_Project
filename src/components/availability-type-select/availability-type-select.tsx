import React from "react";
import classNames from "classnames";
import { UnavailabilityType } from "@webapp/types/unavailability";
import {
  MdOutlineToday,
  MdOutlineCalendarViewWeek,
  MdOutlineCalendarMonth,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import styles from "./availability-type-select.module.scss";

interface AvailabilityTypeSelectProps {
  value: UnavailabilityType;
  onChange: (value: UnavailabilityType) => void;
}

const OPTIONS: { value: UnavailabilityType; label: string; icon: React.ReactElement }[] = [
  { value: UnavailabilityType.DAY, label: "Day", icon: <MdOutlineToday /> },
  { value: UnavailabilityType.WEEK, label: "Week", icon: <MdOutlineCalendarViewWeek /> },
  { value: UnavailabilityType.MONTH, label: "Month", icon: <MdOutlineCalendarMonth /> },
  { value: UnavailabilityType.FROM_TO, label: "Custom", icon: <MdOutlineDashboardCustomize /> },
];

/** Segmented control — replaces the old boxed tiles with a single compact switch. */
const AvailabilityTypeSelect = ({ value = UnavailabilityType.DAY, onChange }: AvailabilityTypeSelectProps) => (
  <div aria-label="Type of unavailability" className={styles["container"]} role="group">
    {OPTIONS.map((option) => {
      const active = value === option.value;

      return (
        <button
          aria-pressed={active}
          className={classNames(styles["option"], { [styles["option-active"]]: active })}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          <span aria-hidden="true" className={styles["icon"]}>
            {option.icon}
          </span>
          <span className={styles["label"]}>{option.label}</span>
        </button>
      );
    })}
  </div>
);

export default AvailabilityTypeSelect;

