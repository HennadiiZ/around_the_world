// import React from 'react';
import { Link } from 'react-router-dom';
import NavPage from '../../components/NavPage/NavPage';

export default function Home() {
  return (
    <div>
      <NavPage />
      <h1>Home</h1>
      <Link to='/app'>App</Link>
    </div>
  );
}
