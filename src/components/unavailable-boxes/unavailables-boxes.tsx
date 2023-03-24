import { Unavailabilities } from "@prisma/client";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./unavailables-boxes.module.scss";

export const UnavailablesDayBox = ({ unavailability, onDelete }: { unavailability: Unavailabilities; onDelete: (unavailability: Unavailabilities) => void }) => {
  return (
    <div>
      <div className={styles["day-box"]}>
        <label>Day:</label>
        <p className={styles["day-date"]}>{(unavailability.value as any).day}</p>
        <MdDeleteOutline size={22} onClick={() => onDelete(unavailability)} />
      </div>
    </div>
  );
};

export const UnavailablesWeekBox = ({ unavailability, onDelete }: { unavailability: Unavailabilities; onDelete: (unavailability: Unavailabilities) => void }) => {
  return (
    <div>
      <div className={styles["from-to-box"]}>
        <label>From:</label>
        <p className={styles["from-to-date"]}>{(unavailability.value as any).from}</p>
        <label>To:</label>
        <p className={styles["from-to-date"]}>{(unavailability.value as any).to}</p>
        <MdDeleteOutline size={22} onClick={() => onDelete(unavailability)} />
      </div>
    </div>
  );
};

export const UnavailablesMonthBox = ({ unavailability, onDelete }: { unavailability: Unavailabilities; onDelete: (unavailability: Unavailabilities) => void }) => {
  return (
    <div>
      <div className={styles["from-to-box"]}>
        <label>From:</label>
        <p className={styles["from-to-date"]}>{(unavailability.value as any).from}</p>
        <label>To:</label>
        <p className={styles["from-to-date"]}>{(unavailability.value as any).to}</p>
        <MdDeleteOutline size={22} onClick={() => onDelete(unavailability)} />
      </div>
    </div>
  );
};

export const UnavailablesFromToBox = ({ unavailability, onDelete }: { unavailability: Unavailabilities; onDelete: (unavailability: Unavailabilities) => void }) => {
  return (
    <div>
      <div className={styles["from-to-box"]}>
        <label>From:</label>
        <p className={styles["from-to-date"]}>{(unavailability.value as any).from}</p>
        <label>To:</label>
        <p className={styles["from-to-date"]}>{(unavailability.value as any).to}</p>
        <MdDeleteOutline size={22} onClick={() => onDelete(unavailability)} />
      </div>
    </div>
  );
};

export const DisableWeekEnd = ({ unavailability, onChange }: { unavailability: Unavailabilities | null; onChange: () => void }) => {
  return (
    <div className={styles["weekend-box"]}>
      <label>Unavailable in week-ends</label>
      <input type={"checkbox"} placeholder="Disable Weekends" checked={unavailability ? true : false} onChange={onChange} />
    </div>
  );
};
