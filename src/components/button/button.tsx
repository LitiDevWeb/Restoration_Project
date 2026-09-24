import type { ReactNode } from "react";
import classNames from "classnames";
import Loader from "../Loader/Loader";
import styles from "./button.module.scss";

interface ButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  /** Full width — used by the admin sign-in form. */
  block?: boolean;
  /** Optional leading icon, rendered before the label. */
  icon?: ReactNode;
  className?: string;
}

const Button = ({
  label,
  active,
  onClick,
  loading = false,
  type = "button",
  block = false,
  icon,
  className,
}: ButtonProps) => (
  <button
    aria-busy={loading}
    className={classNames(styles["container"], { [styles["active"]]: active, [styles["block"]]: block }, className)}
    disabled={loading}
    onClick={() => {
      if (loading) return;
      return onClick?.();
    }}
    type={type}
  >
    {loading ? (
      <Loader />
    ) : (
      <>
        {icon && <span className={styles["icon"]}>{icon}</span>}
        <span>{label}</span>
      </>
    )}
  </button>
);

export default Button;

