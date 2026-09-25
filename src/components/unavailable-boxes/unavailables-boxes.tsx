import type { ReactNode } from "react";
import type { Unavailability, UnavailabilityValue } from "@webapp/types/unavailability";
import dayjs from "dayjs";
import {
  MdDeleteOutline,
  MdOutlineToday,
  MdOutlineCalendarViewWeek,
  MdOutlineCalendarMonth,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import styles from "./unavailables-boxes.module.scss";

interface BoxProps {
  unavailability: Unavailability;
  onDelete: (unavailability: Unavailability) => void;
}

interface BoxShellProps extends BoxProps {
  icon: ReactNode;
  label: string;
  value: string;
  deleteLabel: string;
}

/** The API hands back `value` already parsed, so it is narrowed once more before it reaches the UI. */
const readValue = (unavailability: Unavailability): UnavailabilityValue => unavailability.value ?? {};

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = dayjs(value);

  return date.isValid() ? date.format("ddd, MMM D YYYY") : value;
};

const formatRange = (from?: string, to?: string) => {
  const start = dayjs(from);
  const end = dayjs(to);

  if (!start.isValid() || !end.isValid()) return `${formatDate(from)} → ${formatDate(to)}`;

  const days = end.diff(start, "day") + 1;

  return `${start.format("ddd, MMM D YYYY")} → ${end.format("ddd, MMM D YYYY")} · ${days} ${days === 1 ? "day" : "days"}`;
};

/** One blocked entry: type badge, readable dates and a labelled delete control. */
const BoxShell = ({ icon, label, value, deleteLabel, onDelete, unavailability }: BoxShellProps) => (
  <li className={styles["row"]}>
    <span aria-hidden="true" className={styles["badge"]}>
      {icon}
    </span>

    <div className={styles["info"]}>
      <p className={styles["label"]}>{label}</p>
      <p className={styles["value"]}>{value}</p>
    </div>

    <button aria-label={deleteLabel} className={styles["delete"]} onClick={() => onDelete(unavailability)} type="button">
      <MdDeleteOutline aria-hidden="true" />
    </button>
  </li>
);

export const UnavailablesDayBox = ({ unavailability, onDelete }: BoxProps) => {
  const { day } = readValue(unavailability);

  return (
    <BoxShell
      deleteLabel={`Delete the blocked day ${formatDate(day)}`}
      icon={<MdOutlineToday />}
      label="Single day"
      onDelete={onDelete}
      unavailability={unavailability}
      value={formatDate(day)}
    />
  );
};

export const UnavailablesWeekBox = ({ unavailability, onDelete }: BoxProps) => {
  const { from, to } = readValue(unavailability);

  return (
    <BoxShell
      deleteLabel={`Delete the blocked week starting ${formatDate(from)}`}
      icon={<MdOutlineCalendarViewWeek />}
      label="Full week"
      onDelete={onDelete}
      unavailability={unavailability}
      value={formatRange(from, to)}
    />
  );
};

export const UnavailablesMonthBox = ({ unavailability, onDelete }: BoxProps) => {
  const { from, to } = readValue(unavailability);

  return (
    <BoxShell
      deleteLabel={`Delete the blocked month starting ${formatDate(from)}`}
      icon={<MdOutlineCalendarMonth />}
      label="Full month"
      onDelete={onDelete}
      unavailability={unavailability}
      value={formatRange(from, to)}
    />
  );
};

export const UnavailablesFromToBox = ({ unavailability, onDelete }: BoxProps) => {
  const { from, to } = readValue(unavailability);

  return (
    <BoxShell
      deleteLabel={`Delete the custom range starting ${formatDate(from)}`}
      icon={<MdOutlineDashboardCustomize />}
      label="Custom range"
      onDelete={onDelete}
      unavailability={unavailability}
      value={formatRange(from, to)}
    />
  );
};

