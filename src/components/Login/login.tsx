import React, { useState } from "react";
import Button from "../button/button";
import styles from "./login.module.scss";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "@webapp/constants";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, register } = useForm({
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
      const res = await axios.post(`${API_URL}/api/login`, values);

      if (res.status === 200) {
        window.localStorage.setItem("accessToken", res.data.data.token);
        window.location.reload();
        toast.success("Successfuly Logged In. Welcome");
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      if (err?.response?.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong, please try again later or contact support.");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["container"]}>
      <p className={styles["login-title"]}>LOGIN</p>
      <div className={styles["login-form"]}>
        <div className={styles["login-line"]}>
          <label>EMAIL</label>
          <input {...register("email")} placeholder="Type in your email address" />
        </div>
        <div className={styles["login-line"]}>
          <label>PASSWORD</label>
          <input {...register("password")} type={"password"} placeholder="Type in your password." />
        </div>
      </div>
      <div className={styles["buttons"]}>
        <Button loading={loading} label="Login" type="submit" />
      </div>
    </form>
  );
};

export default Login;
