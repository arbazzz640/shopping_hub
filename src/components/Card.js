import React, { useEffect, useState } from 'react'
import Stars from './Stars';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../Context';
import { BellRing, MoveRight } from 'lucide-react';
import Prod_Not_Avail from './ProductNotAvilable/Prod_Not_Avail';
import LazyLoad from 'react-lazyload';

const Card = ({ products }) => {
    const { addToCart, cart } = useGlobalContext();
    const [addedToCart, setAddedToCart] = useState({});
    const { filterProdcut: { byStock, fastDelivery, sort , priceRange , searchQuery }, dispatchFilterProduct, } = useGlobalContext();

    // console.log(priceRange);

    // Function to check if a product is in the cart based on its ID
    const isProductInCart = (productId) => {
        return cart.some((product) => product.id === productId);
    }


    useEffect(() => {
        const getCartDataFromLs = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') ):[];
        const addedToCartData = {};
        products.forEach((product) => {
            addedToCartData[product.id] = isProductInCart(product.id)
        })
        setAddedToCart(addedToCartData);
    }, [cart, products])


    const addToCartHandler = (details) => {
        // console.log(details);
        addToCart(details);
        // console.log([details.id]);
        setAddedToCart((prevAddedToCart) => ({ ...prevAddedToCart, [details.id]: true }));
    }

     const filterProducts = () => {
        let sortedProducts = [...products]; // Create a copy of the original products

        // Filter by fast delivery
        if (fastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.fast_delivery);
        }
        // Filter out of stock products if byStock is enabled
        if (byStock) {
         sortedProducts = sortedProducts.filter((prod) => !prod.out_of_stock);
        }
        // Sort the products
        if (sort) {
            sortedProducts.sort((a, b) => {
                return sort === 'lowToHigh' ? a.price - b.price : b.price - a.price;
            });
        }
        // Search a product
        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) => {
                const searchQueryLower = searchQuery.toLowerCase();
                const nameMatch = prod.name.toLowerCase().includes(searchQueryLower);
                const categoryMatch = prod.category.toLowerCase().includes(searchQueryLower);
                const brandMatch = prod.brand.toLowerCase().includes(searchQueryLower);
                return nameMatch || categoryMatch || brandMatch;
            });
        }
        // console.log(searchQuery);
        

        // Sort products by price range
        // console.log(priceRange);
        if(priceRange === "low_range"){
           return sortedProducts.filter((prod) => prod.price <= 1000);
        }
        if(priceRange === "med_range"){
            return sortedProducts.filter((prod) => prod.price > 1000 && prod.price <= 2000);
        }
        if(priceRange === "high_range"){
            return sortedProducts.filter((prod) => prod.price > 2000 && prod.price <= 3000);
        }
        if(priceRange === "extra_high_range"){
           return sortedProducts.filter((prod) => prod.price > 3000);
        }

        return sortedProducts;
    };

    // console.log(filterProducts());


    return (
        <>
            {
                filterProducts().length === 0 ? <Prod_Not_Avail /> : (
                    filterProducts().map((currVal) => {
                    const { image, name, brand, description, price, rating, fast_delivery, id, discount, mrp, out_of_stock } = currVal;
                    const isAddedToCart = addedToCart[id];
                    const filledStars = Math.round(rating);
                    // console.log(filledStars);
                    return (
                        // <div className="d-flex">
                        <div className="prodcut_card" key={id}>
                            <div className="product_img">
                                {/* for out of stock  start */}
                                {
                                    out_of_stock &&
                                    <div className="image_overlay">
                                        <p className='outOfStock_txt'> Out of Stock </p>
                                    </div>
                                }
                                {/* for out of stock  end */}
                                {/* <LazyLoad height={210} once> */}
                                    <Link to={`/productDetails/${id}`}>
                                        <img src={`${image}`} alt={name} title={name} />
                                    </Link>
                                {/* </LazyLoad> */}
                            </div>
                            <div className="product_info">
                                <h3 className='brand_name'> {brand} - {name} </h3>
                                <p className='discription'> {description} </p>
                                <p className='prices'>
                                    <span className='discounted_price'> ₹{price} </span>
                                    <span className='mrp_price'> ₹{mrp} </span>
                                    <span className='discount'> ({discount}% off) </span>
                                </p>
                                <div className="rating">
                                    <span> {rating} </span>
                                    <Stars filledStars={filledStars} />
                                    <sub className='user_rating_count'> (120) </sub>
                                </div>
                                {
                                    fast_delivery ? (
                                        <div className="fast_delivery">
                                            fast delivery
                                        </div>
                                    ) : ""
                                }
                            </div>
                            {
                                out_of_stock === false ? (
                                    <div className="buttons">
                                        {
                                            isAddedToCart ? (
                                                <div className="gotocart">
                                                    <Link to={'/cart'}> Go to cart <MoveRight className='right_arrow' size={20} strokeWidth={2} /> </Link>
                                                </div>
                                            ) : (
                                                <div className="addToCartBtn" onClick={() => addToCartHandler(currVal)}> Add To Cart </div>
                                            )
                                        }
                                        <div className="addToshortlistBtn">
                                            <Link to={'/shortlist'}>
                                                Shortlist
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="notify_btn">
                                        <BellRing size={18} className='bellring' />
                                        <Link> Notify Me </Link>
                                    </div>
                                )
                            }
                        </div >
                        // </div>
                    )
                })
            )}
        </>
    )
}

export default Card