import { createContext, useEffect, useReducer, useState } from 'react';
import { BASE_URL } from '../constants/constants';

const CitiesContext = createContext();

//-------- reduser
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unknown error');
  }
}

//--------

function CitiesProvider({ children }) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [cities, setCities] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});

  // const [state, dispatch] = useReducer(reducer, initialState);
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    console.log(id, currentCity.id);
    if (+id === +currentCity.id) {
      return;
    }

    dispatch({ type: 'loading' });

    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data...',
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' });

    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Context-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
      // setCities((cities) => [...cities, data]);
      // console.log('data:', data); // data: {id: 98443198}
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data...',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      //setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
      // setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };

//-----------------------------------------------------------------------------------------

// // import { createContext, useContext, useEffect, useState } from 'react';
// import { createContext, useEffect, useState } from 'react';
// import { BASE_URL } from '../constants/constants';

// const CitiesContext = createContext();

// function CitiesProvider({ children }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [cities, setCities] = useState([]);
//   const [currentCity, setCurrentCity] = useState({});

//   useEffect(() => {
//     async function fetchCities() {
//       try {
//         setIsLoading(true);
//         const res = await fetch(`${BASE_URL}/cities`);
//         const data = await res.json();
//         setCities(data);
//       } catch {
//         console.log('error !!!');
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchCities();
//   }, []);

//   async function getCity(id) {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_URL}/cities/${id}`);
//       const data = await res.json();
//       setCurrentCity(data);
//     } catch {
//       console.log('error !!!');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function createCity(newCity) {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_URL}/cities`, {
//         method: 'POST',
//         body: JSON.stringify('newCity'),
//         headers: {
//           'Context-Type': 'application/json',
//         },
//       });
//       const data = await res.json();
//       // setCities((cities) => [...cities, data]);
//       // console.log('data:', data); // data: {id: 98443198}
//     } catch {
//       console.log('error !!!');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function deleteCity(id) {
//     try {
//       setIsLoading(true);
//       await fetch(`${BASE_URL}/cities/${id}`, {
//         method: 'DELETE',
//       });
//       setCities((prevCities) => prevCities.filter((city) => city.id !== id));
//     } catch {
//       console.log('error !!!');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <CitiesContext.Provider
//       value={{
//         isLoading,
//         cities,
//         currentCity,
//         getCity,
//         createCity,
//         deleteCity,
//       }}
//     >
//       {children}
//     </CitiesContext.Provider>
//   );
// }

// // function useCities() {
// //   const context = useContext(CitiesContext);
// //   if (context === undefined) {
// //     throw new Error('CitiesContext was used outside of the CitiesProvider');
// //   }
// //   return context;
// // }

// export { CitiesProvider, CitiesContext };
// // export { CitiesProvider, useCities };
