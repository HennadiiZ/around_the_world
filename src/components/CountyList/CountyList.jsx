// import React from 'react';
import styles from './CountryList.module.css';
import Spinner from '../Spinner/Spinner';
import CountryItem from '../CountryItem/CountryItem';
import Message from '../Message/Message';

export default function CountryList({ cities, isLoading }) {
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
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </ul>
    // <ul className={styles.countryList}>
    //   {cities.map((city) => (
    //     <CountryItem key={city.id} country={city} />
    //   ))}
    // </ul>
  );
}
