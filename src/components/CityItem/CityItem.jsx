import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CitiesContext } from '../../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, emoji, date, notes, id, position } = city;
  const { getCity, currentCity, isLoading, deleteCity } =
    useContext(CitiesContext);

  function handleClick(e) {
    e.preventDefault();
    console.log(e);
    deleteCity(id);
  }

  return (
    <>
      <li>
        {/* <Link
          to={`${id}?lat=${position.lat}lng=${position.lng}`}
          className={`${styles.cityItem} ${
            id === currentCity.id ? styles['cityItem--active'] : ''
          }`}
        > */}
        {/*  */}
        <Link
          className={`${styles.cityItem} ${
            id === currentCity.id ? styles['cityItem--active'] : ''
          }`}
          to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}> {cityName}</h3>
          <time className={styles.date}> {formatDate(date)}</time>
          <button className={styles.deleteBtn} onClick={handleClick}>
            &times;
          </button>
        </Link>
        {/*  */}
      </li>
    </>
  );
}
