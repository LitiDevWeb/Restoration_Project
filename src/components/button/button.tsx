import classNames from "classnames";
import Loader from "../Loader/Loader";
import styles from "./button.module.scss";

interface ButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ label, active, onClick, loading = false, type = "button" }: ButtonProps) => {
  return (
    <button
      onClick={() => {
        if (loading) return;
        return onClick?.();
      }}
      className={classNames(styles["container"], { [styles["active"]]: active })}
      type={type}
    >
      {loading ? <Loader /> : label}
    </button>
  );
};

export default Button;
