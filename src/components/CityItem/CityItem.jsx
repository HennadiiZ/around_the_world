// import React from 'react';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, emoji, date, notes, id, position } = city;
  // const { cityName, emoji, date, notes, id, {lat, lng} } = city;

  console.log('position', position.lat, position.lng);
  return (
    <>
      {/* <Link to={`${id}`}>
        <li className={styles.cityItem}>
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}> {cityName}</h3>
          <time className={styles.date}> {formatDate(date)}</time>
          <button className={styles.deleteBtn}>&times;</button>
        </li>
      </Link> */}
      <li>
        <Link
          to={`${id}?lat=${position.lat}lng=${position.lng}`}
          className={styles.cityItem}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}> {cityName}</h3>
          <time className={styles.date}> {formatDate(date)}</time>
          <button className={styles.deleteBtn}>&times;</button>
        </Link>
      </li>
    </>
  );
  //   return (
  //     <>
  //       <li className={styles.cityItem}>
  //         <span className={styles.emoji}>{emoji}</span>
  //         <h3 className={styles.name}> {cityName}</h3>
  //         <time className={styles.date}> {formatDate(date)}</time>
  //         <button className={styles.deleteBtn}>&times;</button>
  //       </li>
  //     </>
  //   );
}
