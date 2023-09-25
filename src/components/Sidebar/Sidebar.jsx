// import React from 'react';
//import styles from './Sidebar.modules.css';

import styles from './Sidebar.module.css';
import Logo from '../Logo/Logo';
import AppNav from '../AppNav/AppNav';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Around The World
        </p>
      </footer>
    </div>

    // <>
    //   <Logo />
    //   <AppNav />
    // </>
  );
}
