import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import InfoBox from "./navbar.infobox";
import styles from "./navbar.module.scss";
import { useRouter } from "next/router";

const LOGO_SIZE = 40;

const Navbar = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<String | null>(null);

  const Logout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const GoHome = () => {
    router.push("/home");
  };

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    setAccessToken(accessToken);
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["logo"]}>
        <Image className={styles["home-logo"]} onClick={GoHome} alt="logo" src={"/images/logo.png"} width={LOGO_SIZE} height={LOGO_SIZE} />
        <p>Residentials Contractor ROC 341400</p>
      </div>
      <div className={styles["contact"]}>
        <InfoBox icon={<FaPhoneAlt size={18} />} value={"(602) 245 - 1768"} />
        <InfoBox icon={<FaMapMarkerAlt size={18} />} value={"Phoenix, AZ"} />
        {accessToken && <BiLogOutCircle className={styles["logout"]} onClick={Logout} size={20} />}
      </div>
    </div>
  );
};

export default Navbar;
