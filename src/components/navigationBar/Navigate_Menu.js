import React from 'react'
import './navigate.css'
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi"
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../Context';
import { useState } from 'react';
const Navigate_Menu = () => {
  const { cart } = useGlobalContext();
  const currentPath = window.location.pathname;
  const { dispatchFilterProduct } = useGlobalContext();
  const [searchValue, setSearchValue] = useState('');
 
  const setOnchangeHandle = (e) => {
    setSearchValue(e.target.value)
    let inputVal = e.target.value
    if (inputVal === '') {
      dispatchFilterProduct({
        type: 'SORT_BY_SEARCH',
        payload: '',
      });
    }
  }

  const handleSearchIconClick = () => {
    dispatchFilterProduct({
      type: 'SORT_BY_SEARCH',
      payload: searchValue,
    });
  }
  return (
    <>
      <div className="navigate_menu">
        <div className="menu_left">
          <div className="logo">
            <Link to={'/'}> FASHION HUB </Link>
          </div>
          <div className="custom_select">
            {/* <select className='dropdown' onChange={handleSelectChange} value={selectedValued} autoComplete='off'>
              {
                category.map((catgName) => {
                  const { name } = catgName
                  return (
                    <option value={name}>
                        {name}
                    </option>
                  )
                })
              }
            </select> */}
          </div>
        </div>
        {
          currentPath === '/' ? null : (
            <div className="menu_med">
              <input type="text"
                placeholder="Search a product"
                value={searchValue}
                // onChange={(e) => setSearchValue(e.target.value)}
                onChange={setOnchangeHandle}
              />
              <div className="search_icon_div">
                <BiSearchAlt2 className="search_icon" onClick={handleSearchIconClick} />
              </div>
            </div>
          )
        }
        <div className="menu_right">
          {
            currentPath === "/cart" ? "" : (
              <p className='cart_parent'>
                <Link to={'/cart'}>
                  <ShoppingCart className='cart_icon' />
                  <sup className='cart'> cart </sup>
                  <span className='cart_count'> {cart.length} </span>
                </Link>
              </p>
            )
          }
          <p className='shortlist_parent'> <AiOutlineHeart className='shortlist_icon' />
            <Link to={'/shortlist'} className='shortlist'> shortlist </Link>
          </p>
          <div className='reg_login'>
            <Link to={'/login'} className='login_txt'> Login </Link>
            <span className='small_divider'></span>
            <Link to={'/register'} className='reg_txt'> Register </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigate_Menu
