import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaArrowLeft, FaSignInAlt } from "react-icons/fa";

import Button from "../button/button";
import { API_URL, REQUEST_TIMEOUT } from "@webapp/constants";
import { site } from "@webapp/data/site";
import styles from "./login.module.scss";

/** Admin sign-in — same request flow as before, rebuilt on the current design tokens. */
const Login = () => {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    if (values.email === "") return toast.warning("Please fill in your email");
    if (values.password === "") return toast.warning("Please fill in your password");

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/login`, values, { timeout: REQUEST_TIMEOUT });

      if (res.status === 200) {
        window.localStorage.setItem("accessToken", res.data.data.token);
        toast.success("Successfully logged in. Welcome back.");
        window.location.reload();
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
      // Always released: a failing request used to leave the button spinning forever.
      setLoading(false);
    }
  };

  return (
    <section className={styles["container"]}>
      <div className={styles["card"]}>
        <p className={styles["eyebrow"]}>Admin access</p>
        <h1 className={styles["title"]}>Sign in to the schedule</h1>
        <p className={styles["text"]}>
          Update the dates your crews are already committed to. Every change saved here shows up on the public
          availability calendar right away.
        </p>

        <form className={styles["form"]} noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["field"]}>
            <label htmlFor="admin-email">Email</label>
            <input
              autoComplete="email"
              id="admin-email"
              placeholder="you@fennecrestoration.com"
              type="email"
              {...register("email")}
            />
          </div>

          <div className={styles["field"]}>
            <label htmlFor="admin-password">Password</label>
            <input
              autoComplete="current-password"
              id="admin-password"
              placeholder="Your password"
              type="password"
              {...register("password")}
            />
          </div>

          <Button block icon={<FaSignInAlt aria-hidden="true" />} label="Log in" loading={loading} type="submit" />
        </form>

        <p className={styles["note"]}>
          ROC {site.roc} · {site.areaShort}
        </p>

        <Link className={styles["back"]} href="/home">
          <FaArrowLeft aria-hidden="true" size={12} />
          Back to the website
        </Link>
      </div>
    </section>
  );
};

export default Login;

