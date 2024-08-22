import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context'
import Card from './Card'
import { Link } from 'react-router-dom';
import Navigate_Menu from './navigationBar/Navigate_Menu';
import Sidebar from './sidebar/Sidebar';
// import { Sidebar } from 'semantic-ui-react';
// import { Dropdown } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';

const Products = () => {
    const { products, isloading } = useGlobalContext();
    // const [visibleData, setVisibleData] = useState([]);
    const someData = products.slice(0, 8)
    const currentPath = window.location.pathname;
    // console.log("🚀 ~ file: Products.js:13 ~ Products ~ url:", url)
    // console.log(currentPath);


    // for adding dynamic products 
    // useEffect(() => {
    //     setVisibleData(products.slice(0, 12));
    //     // generateRandomNumber()
    // }, [products]);
    // const handleScroll = () => {
    //     const bottom =
    //         Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    //     if (bottom) {
    //         const numOfPordAdd = 6;
    //         setVisibleData(prevData =>
    //             prevData.concat(products.slice(prevData.length, prevData.length + numOfPordAdd))
    //         );
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [products]);


    return (
        <>
            {
                currentPath === '/' ? "" : <Navigate_Menu />
            }
            <div className='products'>
                {/* <h2 className='prods_heading'> PRODUCTS </h2> */}
                {
                    currentPath === '/' ? (
                        <>
                            <div className="d-flex">
                                <Card products={someData} />
                            </div>
                            <div className="view_all">
                                <Link to={`/products`}>
                                    view all
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className='d-flex product_wrapper'>
                                <Sidebar />
                            <div className="d-flex prods_cards">
                                <Card products={products} />
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Products
