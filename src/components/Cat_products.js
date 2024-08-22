import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Context';
import Card from './Card';
import Navigate_Menu from './navigationBar/Navigate_Menu';
import Sidebar from './sidebar/Sidebar';

const Cat_products = () => {
  // type humne path me se likha hain "/category/:type"
  const { type } = useParams();
  // console.log(type);
  const { products } = useGlobalContext()
  // console.log(products);
  // console.log(type)
  const filteredProducts = products.filter(currEle => currEle.category == type);
  // console.log(filteredProducts);
  return (
    <>
      <Navigate_Menu />
      <div className="product_page d-flex">
        {/* <p className='page_heading'> {type} </p> */}
          <Sidebar />
        <div className='d-flex products_div'>
          <Card key={products.id} products={filteredProducts} />
        </div>
      </div>
    </>
  )
}

export default Cat_products
