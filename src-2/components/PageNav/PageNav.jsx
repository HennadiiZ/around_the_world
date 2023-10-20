// import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { AuthContext } from '../../contexts/FakeAuthContext';
import styles from './PageNav.module.css';

export default function PageNav() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          {!isAuthenticated && (
            <NavLink to='/login' className={styles.ctaLink}>
              login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
