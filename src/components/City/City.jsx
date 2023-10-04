import { useContext, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CitiesContext } from '../../contexts/CitiesContext';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import styles from './City.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const { getCity, currentCity, isLoading } = useContext(CitiesContext);
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(() => {
    getCity(id);
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        Map{lat}
        {lng}
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type='back'
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
        {/* <ButtonBack /> */}
      </div>
    </div>
  );
}

export default City;

// import { useParams, useSearchParams } from 'react-router-dom';
// import styles from './City.module.css';

// const formatDate = (date) =>
//   new Intl.DateTimeFormat('en', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     weekday: 'long',
//   }).format(new Date(date));

// function City() {
//   // TEMP DATA
//   const currentCity = {
//     cityName: 'Lisbon',
//     emoji: '🇵🇹',
//     date: '2027-10-31T15:59:59.138Z',
//     notes: 'My favorite city so far!',
//   };

//   const { cityName, emoji, date, notes } = currentCity;
//   const { id } = useParams();
//   // console.log(cityId); // {id: '73930385'}
//   // console.log(cityId.id); // {id: '73930385'}
//   const [searchParams, setSearchParams] = useSearchParams();
//   const lat = searchParams.get('lat');
//   const lng = searchParams.get('lng');

//   return (
//     <div className={styles.city}>
//       <div className={styles.row}>
//         <h6>City name</h6>
//         Map{lat}
//         {lng}
//         <h3>
//           <span>{emoji}</span> {cityName}
//         </h3>
//       </div>

//       <div className={styles.row}>
//         <h6>You went to {cityName} on</h6>
//         <p>{formatDate(date || null)}</p>
//       </div>

//       {notes && (
//         <div className={styles.row}>
//           <h6>Your notes</h6>
//           <p>{notes}</p>
//         </div>
//       )}

//       <div className={styles.row}>
//         <h6>Learn more</h6>
//         <a
//           href={`https://en.wikipedia.org/wiki/${cityName}`}
//           target='_blank'
//           rel='noreferrer'
//         >
//           Check out {cityName} on Wikipedia &rarr;
//         </a>
//       </div>

//       <div>
//         <ButtonBack />
//       </div>
//     </div>
//   );
// }

// export default City;
