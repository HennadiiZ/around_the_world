// import React from 'react';
import { useContext } from 'react';
// import { CitiesContext, useCities } from '../../contexts/CitiesContext';
import { CitiesContext } from '../../contexts/CitiesContext';
import styles from './CityList.module.css';
import Spinner from '../Spinner/Spinner';
import CityItem from '../CityItem/CityItem';
import Message from '../Message/Message';

export default function CityList() {
  const { cities, isLoading } = useContext(CitiesContext);
  // const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message='Add your first city by clicking on a city on the map.' />
    );
  }

  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
