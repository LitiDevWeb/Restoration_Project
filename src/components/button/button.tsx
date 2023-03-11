import classNames from 'classnames';
import styles from './button.module.scss';

interface ButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const Button = ({ label, active, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={classNames(styles['container'], { [styles['active']]: active })}>
      {label}
    </button>
  );
};

export default Button;
