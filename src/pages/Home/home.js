import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../components/icons/logo'; // Ensure the correct path
import styles from './home.module.scss'; // Import the SCSS file

export default function Home() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.Logo}>{logo.dark}</div>
        <div className={styles.Title}>
          EDOTCO {/* Hardcoded version for now */}
        </div>
        <div className={styles.Des}>Powered by Ursaleo</div>
        <div className={styles.MenuButtons}>
          <Link to="/add-new-tower">
            <button className={styles.MenuButton}>Add New Tower</button>
          </Link>
          <Link to="/add-new-template">
            <button className={styles.MenuButton}>Add New Template</button>
          </Link>
          <Link to="/add-new-equipment">
            <button className={styles.MenuButton}>Add New Equipment</button>
          </Link>
        </div>
      </header>
    </div>
  );
}
