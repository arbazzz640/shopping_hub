import React from 'react'
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Cat_products from './components/Cat_products';
import Products from './components/Products';
import PDP from './components/productDetails/PDP';
import Cart from './components/cart/Cart';
import Shortlist from './components/shortlist/Shortlist';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Products />} path="/products" />
        <Route element={<Cat_products />} path="/category/:type" />
        <Route element={<PDP />} path='/productDetails/:prodID' />
        <Route element={<Cart />} path='/cart' />
        <Route element={<Shortlist />} path='/shortlist' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
      </Routes>
    </div>

  );
}

export default App;
