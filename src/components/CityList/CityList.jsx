import { useContext } from 'react';
import { CitiesContext } from '../../contexts/CitiesContext';
import styles from './CityList.module.css';
import Spinner from '../Spinner/Spinner';
import CityItem from '../CityItem/CityItem';
import Message from '../Message/Message';

export default function CityList() {
  const { cities, isLoading } = useContext(CitiesContext);

  const s_styles = {
    width: '100%',
    height: '65vh',
    listStyle: 'none',
    overflowY: 'scroll',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem',
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message='Add your first city by clicking on a city on the map.' />
    );
  }

  return (
    <ul className={styles} style={s_styles}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
