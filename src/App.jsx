import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

function App() {
  // return <>world</>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
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
