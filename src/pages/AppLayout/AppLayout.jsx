// import React from 'react';
// import AppNav from '../../components/AppNav/AppNav';
// import Sidebar from '../../components/Sidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
