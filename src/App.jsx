import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import Product from './pages/Product/Product';
// import Pricing from './pages/Pricing/Pricing';
// import Home from './pages/Home/Home';
// import PageNotFound from './pages/PageNotFound/PageNotFound';
// import AppLayout from './pages/AppLayout/AppLayout';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage/Homepage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AppLayout from './pages/AppLayout/AppLayout';
import Login from './pages/Login/Login';

function App() {
  // return <>world</>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route path='app' element={<AppLayout />} />
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
