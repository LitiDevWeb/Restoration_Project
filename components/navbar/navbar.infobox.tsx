import styles from './navbar.module.scss';

interface InfoBoxProps {
  icon: React.ReactElement;
  value: string;
}

const InfoBox = ({ icon, value }: InfoBoxProps) => {
  return (
    <div className={styles['info-box-container']}>
      {icon}
      <p>{value}</p>
    </div>
  );
};

export default InfoBox;
