import React, { useEffect } from 'react';
import styles from './SplashScreen.module.scss'; // Import the SCSS file
import ursaleoLogo from '../../assets/logo/ursaleo-logo.png'; // Adjust the path as necessary
import edotcoLogo from '../../assets/logo/edotco-logo.png'; // Adjust the path as necessary

export default function SplashScreen({ onEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnd();
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div className={styles.SplashScreen}>
      <img src={ursaleoLogo} alt="Ursaleo Logo" className={styles.Logo} />
      <img src={edotcoLogo} alt="Edocto Logo" className={styles.Logo} />
    </div>
  );
}
