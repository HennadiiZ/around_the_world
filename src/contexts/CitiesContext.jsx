import { createContext, useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../constants/constants';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
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
