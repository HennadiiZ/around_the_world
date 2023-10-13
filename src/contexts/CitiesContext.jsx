// import { createContext, useContext, useEffect, useState } from 'react';
import { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../constants/constants';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log('error !!!');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      console.log('error !!!');
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Context-Type': 'application/json',
        },
      });
      const data = await res.json();
      // setCurrentCity(data);
      // console.log(data);
      console.log('data:', data);
    } catch {
      console.log('error !!!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// function useCities() {
//   const context = useContext(CitiesContext);
//   if (context === undefined) {
//     throw new Error('CitiesContext was used outside of the CitiesProvider');
//   }
//   return context;
// }

export { CitiesProvider, CitiesContext };
// export { CitiesProvider, useCities };
