import React from 'react'
import './commen_component.css';
import Main_Banner from './Main_Banner';
import Category from './Category';
import Products from './Products';
import Navigate_Menu from './navigationBar/Navigate_Menu';
import Login from './Authentication/Login';

const Home = () => {
  return (
    <>
        <Navigate_Menu />
        <Main_Banner />
        <Category />
        <Products />
    </>
  )
}

export default Home
