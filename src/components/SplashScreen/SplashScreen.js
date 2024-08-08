import React, { useEffect, useState } from 'react';
import styles from './SplashScreen.module.scss'; // Import the SCSS file
import ursaleoLogo from '../../assets/logo/ursaleo-logo.png'; // Adjust the path as necessary
import edotcoLogo from '../../assets/logo/edotco-logo.png'; // Adjust the path as necessary

export default function SplashScreen({ onEnd }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onEnd();
      }, 500); // Adjust the duration to match the fade-out animation duration
    }, 2000); // 2 seconds before starting the fade-out

    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div className={`${styles.SplashScreen} ${fadeOut ? styles.FadeOut : ''}`}>
      <img src={ursaleoLogo} alt="Ursaleo Logo" className={styles.Logo1} />
      <img src={edotcoLogo} alt="Edotco Logo" className={styles.Logo2} />
    </div>
  );
}
