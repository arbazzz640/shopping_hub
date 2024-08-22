import React, { useEffect } from 'react'
import { useGlobalContext } from '../../Context';
import './cart.css'
import Navigate_Menu from '../navigationBar/Navigate_Menu';
import { Trash2 } from 'lucide-react';
import cartImage from '../../images/empty_cart.png';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { itemQuantities, itemQuantitiesDispatch, cart, fetchCartContent, totalPrice, removeProductFromCart } = useGlobalContext(); // Access itemQuantities and dispatch

  useEffect(() => {
    fetchCartContent();
  }, []);

  useEffect(() => {
    itemQuantitiesDispatch({ type: 'CALCULATE_TOTAL_PRICE' });
  }, [cart.length, itemQuantities])

  const handleQuantityChange = (itemId, newQuantity) => {
    // console.log(itemId, newQuantity);
    // itemid me product ke id hain.
    // newQuantity me user ne jitne quantity select ke hain woh Aati hain.
    itemQuantitiesDispatch({
      type: 'SET_QUANTITY',
      itemId: itemId,
      quantity: newQuantity,
    });
    // calculateTotalPrice();

  };
  // console.log(cart);
  const prodPrice = cart.map(price => {
    return price.price
  }).filter(filterPrice => filterPrice <= 1000)
  // console.log(prodPrice);

  const handleRemoveClick = (prodId) => {
    removeProductFromCart(prodId)
  }

  const subTotal = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);
  return (
    <>
      <Navigate_Menu />
      {
        cart.length === 0  ? (
          <div className='empty_cart'>
            {/* <div> Cart Empty </div> */}
            <div className='empty_cart_image'> 
              <img src={cartImage} alt="cart image" />
            </div>
            <p className='cart_empty_msg'> 
              <span> Your Cart is </span>
              <span className='empty_txt'> Empty! </span>
            </p>
            <p className='add_item_txt'> Must add items on the cart before you proceed to check out. </p>
            <div className='return_to_shop'>
              <Link to={'/products'}> Return to Shop </Link>
            </div>
          </div>
        ):(
        <div className="wrapper">
          {/* <h1>Shopping Cart</h1> */}
          <div className="wrap">
            <div className="shop">
              {
                cart.map((currVal) => {
                  const { image, name, brand, description, price, rating, fast_delivery, id, discount, mrp, quantity, out_of_stock } = currVal;
                  const availableQuantity = quantity;
                  const selectedQuantity = itemQuantities[id] || 1; //quantity currently selected for the item, or the default value of 1 if not set
                  // console.log( name , quantity);
                  // console.log(name, selectedQuantity);
 
                  return (
                    <div className="box" key={id}>
                      <div className="img_side">
                        <div className="img_box">
                          <img src={`${image}`} alt={name} title={name} />
                        </div>
                      </div>
                      <div className="content">
                        <h3 className='prod_brand'> {brand} - {name} </h3>
                        <p className='discription'> {description} </p>
                        <div className='prices'>
                          <span className='discounted_price'> ₹{price} </span>
                          <span className='mrp_price'> ₹{mrp} </span>
                          <span className='discount'> ({discount}% off) </span> 
                          {
                            price < 1000 ? <span className="delCharges"> + 50Rs </span> : ""
                          }
                        </div>
                        {
                          out_of_stock ? <h2 className='out_of_stock'> Out of stock </h2> : (
                            <div className="quantity_dropdown">
                              <select
                                value={selectedQuantity}
                                onChange={(e) => handleQuantityChange(id, e.target.value)}
                                className='qty_dropdown'
                              >
                                {Array.from({ length: availableQuantity }).map((_, index) => {
                                  const quantity = index + 1;
                                  return (
                                    <option key={quantity} value={quantity}>
                                      {quantity}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          )
                        }
                        {
                          price > 1000 ? <div className="freetag"> Free Delivery </div> : ""
                        }

                        <p className="btn-area">
                          <Trash2 size={20} strokeWidth={2} className='delete_icon' />         <span className="btn2 removefromcartbtn" onClick={() => handleRemoveClick(id)}> DELETE </span>
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="right-bar">
              <p><span> Subtotal </span><span> ₹{subTotal} </span></p>
              <hr />
              <p><span>Shipping</span> <span> {50 * prodPrice.length} </span></p>
              <hr />
              <p><span>Total</span> <span>₹{totalPrice + 50 * prodPrice.length}
              </span></p><a href="#"><i className="fa fa-shopping-cart" /> Pay </a>
            </div>
          </div>
        </div>
         )
        }

    </>
  )
}

export default Cart
