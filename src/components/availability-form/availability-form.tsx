import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";
import { UnavailabilityType } from "@prisma/client";

import AvailabilityTypeSelect from "../availability-type-select/availability-type-select";
import Button from "../button/button";
import { API_URL, REQUEST_TIMEOUT } from "@webapp/constants";
import styles from "./availability-form.module.scss";

import "react-datepicker/dist/react-datepicker.css";

const AvailabilityForm = ({ closeModal }: { closeModal: () => void }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<UnavailabilityType>(UnavailabilityType.DAY);
  const [day, setDay] = useState<Date>(new Date());
  const [from, setFrom] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());

  const handleTypeChange = (value: UnavailabilityType) => {
    setType(value);

    if (value === UnavailabilityType.WEEK) {
      setFrom(new Date());
      setTo(new Date(dayjs(from).add(1, "week").format()));
    }

    if (value === UnavailabilityType.MONTH) {
      setFrom(new Date());
      setTo(new Date(dayjs(from).add(1, "month").format()));
    }

    if (value === UnavailabilityType.FROM_TO) {
      setFrom(new Date());
      setTo(new Date(dayjs(from).add(2, "week").format()));
    }
  };

  const handleOnSubmit = async () => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) return toast.error("Something went wrong! try to login again.");

    if (type === UnavailabilityType.FROM_TO && dayjs(to).isBefore(dayjs(from), "day")) {
      return toast.warning("The end date has to be after the start date.");
    }

    setLoading(true);

    const payload: any = { type: null, value: {} };

    payload.type = type;

    if (type === UnavailabilityType.DAY) payload.value.day = dayjs(day).format("YYYY-MM-DD");
    else {
      payload.value.from = dayjs(from).format("YYYY-MM-DD");
      payload.value.to = dayjs(to).format("YYYY-MM-DD");
    }

    try {
      const res = await axios.post(`${API_URL}/api/unavailabilities`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: REQUEST_TIMEOUT,
      });

      if (res.status === 200) {
        toast.success("Unavailability successfully added.");

        setType(UnavailabilityType.DAY);
        setDay(new Date());
        setFrom(new Date());
        setTo(new Date());

        closeModal();
        router.replace(router.asPath);
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
      // Always released so the save button can never stay stuck in its loading state.
      setLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <header className={styles["header"]}>
        <div>
          <p className={styles["eyebrow"]}>Calendar values</p>
          <h2 className={styles["title"]}>Block new dates</h2>
        </div>

        <button aria-label="Close the form without saving" className={styles["close"]} onClick={closeModal} type="button">
          <FaTimes aria-hidden="true" size={14} />
        </button>
      </header>

      <AvailabilityTypeSelect value={type} onChange={handleTypeChange} />

      <form
        className={styles["form"]}
        onSubmit={(event) => {
          event.preventDefault();
          handleOnSubmit();
        }}
      >
        <div className={styles["form-types"]}>
          {type === UnavailabilityType.DAY && (
            <div className={styles["line"]}>
              <div className={styles["field"]}>
                <label htmlFor="unavailability-day">Day</label>
                <DatePicker
                  id="unavailability-day"
                  key={0}
                  className={styles["date-picker-input"]}
                  minDate={new Date()}
                  onChange={(date) => setDay(date as Date)}
                  placeholderText="Please select a date."
                  selected={day}
                  wrapperClassName={styles["date-picker-wrapper"]}
                />
              </div>
            </div>
          )}

          {type === UnavailabilityType.WEEK && (
            <div className={styles["line"]}>
              <div className={styles["field"]}>
                <label htmlFor="unavailability-week-start">Week starts</label>
                <DatePicker
                  id="unavailability-week-start"
                  key={1}
                  className={styles["date-picker-input"]}
                  minDate={new Date()}
                  onChange={(date) => {
                    setFrom(date as Date);
                    setTo(new Date(dayjs(date).add(1, "week").format()));
                  }}
                  placeholderText="Please select a date."
                  selected={from}
                  wrapperClassName={styles["date-picker-wrapper"]}
                />
              </div>

              <div className={styles["field"]}>
                <label htmlFor="unavailability-week-end">Week ends</label>
                <DatePicker
                  id="unavailability-week-end"
                  key={2}
                  className={styles["date-picker-input"]}
                  disabled
                  onChange={() => {}}
                  placeholderText="Please select a date."
                  selected={to}
                  title="Calculated automatically from the start date"
                  wrapperClassName={styles["date-picker-wrapper"]}
                />
                <p className={styles["hint"]}>Calculated from the start date.</p>
              </div>
            </div>
          )}

          {type === UnavailabilityType.MONTH && (
            <div className={styles["line"]}>
              <div className={styles["field"]}>
                <label htmlFor="unavailability-month-start">Month starts</label>
                <DatePicker
                  id="unavailability-month-start"
                  key={3}
                  className={styles["date-picker-input"]}
                  minDate={new Date()}
                  onChange={(date) => {
                    setFrom(date as Date);
                    setTo(new Date(dayjs(date).add(1, "month").format()));
                  }}
                  placeholderText="Please select a date."
                  selected={from}
                  wrapperClassName={styles["date-picker-wrapper"]}
                />
              </div>

              <div className={styles["field"]}>
                <label htmlFor="unavailability-month-end">Month ends</label>
                <DatePicker
                  id="unavailability-month-end"
                  key={4}
                  className={styles["date-picker-input"]}
                  disabled
                  onChange={() => {}}
                  placeholderText="Please select a date."
                  selected={to}
                  title="Calculated automatically from the start date"
                  wrapperClassName={styles["date-picker-wrapper"]}
                />
                <p className={styles["hint"]}>Calculated from the start date.</p>
              </div>
            </div>
          )}

          {type === UnavailabilityType.FROM_TO && (
            <div className={styles["line"]}>
              <div className={styles["field"]}>
                <label htmlFor="unavailability-from">From</label>
                <DatePicker
                  id="unavailability-from"
                  key={5}
                  className={styles["date-picker-input"]}
                  minDate={new Date()}
                  onChange={(date) => setFrom(date as Date)}
                  placeholderText="Please select a date."
                  selected={from}
                  wrapperClassName={styles["date-picker-wrapper"]}
                />
              </div>

              <div className={styles["field"]}>
                <label htmlFor="unavailability-to">To</label>
                <DatePicker
                  id="unavailability-to"
                  key={6}
                  className={styles["date-picker-input"]}
                  minDate={from}
                  onChange={(date) => setTo(date as Date)}
                  placeholderText="Please select a date."
                  selected={to}
                  wrapperClassName={styles["date-picker-wrapper"]}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles["buttons"]}>
          <Button icon={<FaCheck aria-hidden="true" />} label="Save" loading={loading} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AvailabilityForm;

