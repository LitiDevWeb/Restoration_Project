import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { site } from "@webapp/data/site";
import InfoBox from "./navbar.infobox";
import styles from "./navbar.module.scss";

const LOGO_SIZE = 40;

/** Admin chrome — the public header links would be noise inside the scheduling tool. */
const Navbar = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const Logout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    setAccessToken(window.localStorage.getItem("accessToken"));
  }, []);

  return (
    <header className={styles["container"]}>
      <div className={styles["inner"]}>
        <Link className={styles["brand"]} href="/home">
          <Image alt={`${site.shortName} logo`} className={styles["logo"]} height={LOGO_SIZE} src={"/images/logo.png"} width={LOGO_SIZE} />
          <span className={styles["brand-text"]}>
            <strong>{site.shortName}</strong>
            <small>
              Scheduling admin · ROC {site.roc}
            </small>
          </span>
        </Link>

        <div className={styles["meta"]}>
          <InfoBox icon={<FaPhoneAlt size={14} />} value={site.phoneDisplay} />
          <InfoBox icon={<FaMapMarkerAlt size={14} />} value={site.areaShort} />
          {accessToken && (
            <button aria-label="Log out of the scheduling admin" className={styles["logout"]} onClick={Logout} type="button">
              <BiLogOutCircle aria-hidden="true" size={18} />
              <span>Log out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

