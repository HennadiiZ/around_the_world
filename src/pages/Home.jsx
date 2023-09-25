import React from 'react';
import { Link } from 'react-router-dom';
import NavPage from '../components/NavPage';

export default function Home() {
  return (
    <div>
      <NavPage />
      Home
      {/* <Link to='/pricing'>pricing</Link> */}
    </div>
  );
}
