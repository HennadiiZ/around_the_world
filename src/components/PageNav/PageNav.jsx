// import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import User from '../User';
import styles from './PageNav.module.css';

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/* <li>
          <NavLink to='/'>Home</NavLink>
        </li> */}
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          <NavLink to='/login' className={styles.ctaLink}>
            login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
