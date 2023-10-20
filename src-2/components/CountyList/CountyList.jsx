import { useContext } from 'react';
import { CitiesContext } from '../../contexts/CitiesContext';
import styles from './CountryList.module.css';
import Spinner from '../Spinner/Spinner';
import CountryItem from '../CountryItem/CountryItem';
import Message from '../Message/Message';

export default function CountryList() {
  const { cities, isLoading } = useContext(CitiesContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message='Add your first city by clicking on a city on the map.' />
    );
  }

  // 1st solution
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  // 2nd solution
  //   const countriesSet = new Set();
  //   cities.forEach((city) => {
  //     countriesSet.add(city.country);
  //   });
  //   const countries = Array.from(countriesSet); // ['Portugal', 'Spain', 'Germany']

  console.log('countries', countries);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
