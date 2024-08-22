
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const initialState = {
        products: [],
        isloading: true,
        cart: [],
        itemQuantities: {},
        totalPrice: 0,
        isLoggedIn : false
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    // for filter product start 
    const filterInitialState = {
        byStock: false,
        fastDelivery: false,
        searchQuery: ""
    }
    const [filterProdcut, dispatchFilterProduct] = useReducer(reducer, filterInitialState);
    // for filter product end 

    let API_DATA = `https://fashionhubapi.onrender.com/products`;

    const addToCart = async (cartProducts) => {
        try {
            dispatch({
                type: 'ADD_TO_CART',
                payload: cartProducts,
            });
            const updatedCart = [...state.cart, cartProducts];
            console.log(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.log("Error adding to cart:", error);
        }
    };

    const fetchCartContent = async () => {
        try {
            const storedData = localStorage.getItem('cart');
            if (storedData) {
                dispatch({
                    type: 'SET_CART_CONTENT',
                    payload: JSON.parse(storedData),
                });
            }
        } catch (error) {
            console.log("Error fetching cart:", error);
        }
    };

    const fetchApiData = async (url) => {
        try {
            const res = await axios.get(url);
            const data = res.data;
            console.log('API Response:', data);
            dispatch({
                type: 'API_DATA',
                payload: {
                    myproducts: data,
                    loading: false,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    console.log();

    const removeProductFromCart = (prodId) => {
        // console.log(prodId);
        const newCart = state.cart.filter(product => product.id !== prodId);
        dispatch({
            type: 'REMOVE_CART_CONTENT',
            payload: prodId
        });
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    useEffect(() => {
        fetchApiData(API_DATA);
        fetchCartContent(); // Fetch cart content when component mounts
    }, []);
    // const allProductData = state.products
    // console.log(allProductData);


    return (
        <AppContext.Provider value={{ ...state, addToCart, fetchCartContent, removeProductFromCart, itemQuantities: state.itemQuantities, itemQuantitiesDispatch: dispatch, filterProdcut, dispatchFilterProduct , loginDispatch: dispatch}}>
            {children}
        </AppContext.Provider>

    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };

