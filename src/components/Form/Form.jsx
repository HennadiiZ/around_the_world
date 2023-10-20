// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import styles from './Form.module.css';
import Button from '../Button/Button';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CitiesContext } from '../../contexts/CitiesContext';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDateString(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleString('en-US', options);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [geocodingErr, setGeocodingErr] = useState('');
  const { createCity, isLoading } = useContext(CitiesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) {
      return;
    }

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingErr('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error("That doesn't seem to be a city.");
        }

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName || '');
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingErr(err.message);
        console.log('err', err);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    console.log('newCity:', newCity);
    navigate('/app');
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message={'Start by clicking on the map'} />;
  }

  if (geocodingErr) {
    return <Message message={geocodingErr} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button
          type='back'
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default Form;

// npm i react-datepicker
