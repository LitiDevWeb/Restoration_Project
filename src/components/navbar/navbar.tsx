import Image from 'next/image';
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import InfoBox from './navbar.infobox';
import styles from './navbar.module.scss';

const LOGO_SIZE = 40;

const Navbar = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['logo']}>
        <Image alt='logo' src={'/images/logo.png'} width={LOGO_SIZE} height={LOGO_SIZE} />
        <p>Residentials Contractor ROC 341400</p>
      </div>
      <div className={styles['contact']}>
        <InfoBox icon={<FaPhoneAlt size={18} />} value={'(602) 245 - 1768'} />
        <InfoBox icon={<FaMapMarkerAlt size={18} />} value={'Phoenix, AZ'} />
      </div>
    </div>
  );
};

export default Navbar;
