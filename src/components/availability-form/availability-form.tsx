import { UnavailabilityType } from "@prisma/client";
import React, { useState } from "react";
import AvailabilityTypeSelect from "../availability-type-select/availability-type-select";
import Button from "../button/button";
import styles from "./availability-form.module.scss";
import DatePicker from "react-datepicker";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from "@webapp/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AvailabilityForm = ({ closeModal }: { closeModal: () => void }) => {
  const router = useRouter();

  const handleOnSubmit = async () => {
    setLoading(true);

    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) {
      setLoading(false);
      return toast.error("Something went wrong! try to login again.");
    }

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
      });

      if (res.status === 200) {
        router.replace(router.asPath);

        toast.success("Unavailability successfully added.");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong, please try again later or contact support.");
    }

    setType(UnavailabilityType.DAY);
    setDay(new Date());
    setFrom(new Date());
    setTo(new Date());
    closeModal();

    setLoading(false);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<UnavailabilityType>(UnavailabilityType.DAY);
  const [day, setDay] = useState<Date>(new Date());
  const [from, setFrom] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());

  return (
    <div className={styles["container"]}>
      <p className={styles["header"]}>AVAILABILITY</p>
      <form className={styles["form"]}>
        <div>
          <AvailabilityTypeSelect
            value={type}
            onChange={(value: UnavailabilityType) => {
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
            }}
          />
          <div className={styles["form-types"]}>
            {type === UnavailabilityType.DAY && (
              <div className={styles["line"]}>
                <div>
                  <label>DAY</label>
                  <div>
                    <DatePicker key={0} className={styles["date-picker-input"]} selected={day} onChange={(date) => setDay(date as Date)} placeholderText="Please select a date." />
                  </div>
                </div>
              </div>
            )}
            {type === UnavailabilityType.WEEK && (
              <div className={styles["line"]}>
                <div>
                  <label>Week Starts</label>
                  <div>
                    <DatePicker
                      key={1}
                      className={styles["date-picker-input"]}
                      selected={from}
                      onChange={(date) => {
                        setFrom(date as Date);
                        setTo(new Date(dayjs(date).add(1, "week").format()));
                      }}
                      placeholderText="Please select a date."
                    />
                  </div>
                </div>

                <div>
                  <label>Week Ends</label>
                  <div>
                    <DatePicker key={2} disabled className={styles["date-picker-input"]} selected={to} onChange={() => {}} placeholderText="Please select a date." />
                  </div>
                </div>
              </div>
            )}
            {type === UnavailabilityType.MONTH && (
              <div className={styles["line"]}>
                <div>
                  <label>Month Starts</label>
                  <div>
                    <DatePicker
                      key={3}
                      className={styles["date-picker-input"]}
                      selected={from}
                      onChange={(date) => {
                        setFrom(date as Date);
                        setTo(new Date(dayjs(date).add(1, "month").format()));
                      }}
                      placeholderText="Please select a date."
                    />
                  </div>
                </div>

                <div>
                  <label>Month Ends</label>
                  <div>
                    <DatePicker disabled key={4} className={styles["date-picker-input"]} selected={to} onChange={() => {}} placeholderText="Please select a date." />
                  </div>
                </div>
              </div>
            )}
            {type === UnavailabilityType.FROM_TO && (
              <div className={styles["line"]}>
                <div>
                  <label>From</label>
                  <div>
                    <DatePicker
                      key={5}
                      className={styles["date-picker-input"]}
                      selected={from}
                      onChange={(date) => setFrom(date as Date)}
                      placeholderText="Please select a date."
                    />
                  </div>
                </div>

                <div>
                  <label>To</label>
                  <div>
                    <DatePicker className={styles["date-picker-input"]} selected={to} onChange={(date) => setTo(date as Date)} placeholderText="Please select a date." />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles["buttons"]}>
          <AiOutlineCloseCircle onClick={closeModal} size={28} />
          <Button loading={loading} onClick={handleOnSubmit} label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AvailabilityForm;
