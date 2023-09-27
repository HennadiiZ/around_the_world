import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage/Homepage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AppLayout from './pages/AppLayout/AppLayout';
import Login from './pages/Login/Login';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountyList/CountyList';
import City from './components/City/City';

const BASE_URL = 'http://localhost:9000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch('http://localhost:9000/cities')
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='app' element={<AppLayout />} /> */}
        <Route path='app' element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          {/*  */}
          <Route path='cities/:id' element={<City />} />
          {/*  */}
          <Route
            path='countries'
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path='form' element={<p>form</p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// npm run dev
// npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
// new file .eslintrc.json

// {
//   "extends": "react-app"
// }

// npm i react-router-dom@6
// npm i json-server
// npm run server
