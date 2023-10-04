import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
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
import Form from './components/Form/Form';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;

//2 - this branch is for context
// npm run dev
// npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
// new file .eslintrc.json

// {
//   "extends": "react-app"
// }

// npm i react-router-dom@6
// npm i json-server
// npm run server

// <Link
// to={`${id}?lat=${position.lat}&lng=${position.lng}`}
// >

// By adding & between position.lat and lng,
// you're properly separating the lat and lng parameters,
// ensuring they are formatted correctly in the URL.
