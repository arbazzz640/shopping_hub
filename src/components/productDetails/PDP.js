import React from 'react';
import './pdp.css';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../Context';
import Stars from '../Stars';
import '../commen_component.css'

const PDP = () => {
  const { products } = useGlobalContext();
  const { prodID } = useParams();
  const productId = parseInt(prodID);
  console.log(productId);

  const prodDetails = products.filter((prod) => prod.id === productId);
  const product = prodDetails[0];

  // Check if the product is available
  if (!product) {
    return <div>Loading...</div>;
  }
  const filledStars = Math.round(product.rating);

  console.log(product);

  return (
    <div className='prod_details'>
      <div className="prod_row">
        <div className="left_part">
          <div className="product_img">
            <img src={product.image} alt={product.name} title={product.name} />
          </div>
        </div>
        <div className="right_part">
          <p className='prod_name'> {product.name} - {product.brand} </p>
          <p className='prod_description'> {product.description} </p>
          <div className="procuct_price">
            <p>
              <span className='discounted_price'> ₹{product.price} </span>
              <span className='mrp_price'> ₹{product.mrp}</span>
              <span className='discount'> ({product.discount}% off) </span>
            </p>
            <p className='mrp_incl_text'> MRP incl. all taxes, Add'l charges may apply on discounted price </p>
          </div>
          <div className='rating'>
            <span> {product.rating} </span>
            <Stars filledStars={filledStars} />
            <sub className='user_rating_count'> (120) </sub>
          </div>
          <div className="addToCartBtn">
            Add To Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDP;
