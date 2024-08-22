import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { useNavigate, useParams } from 'react-router-dom';
import Category_api from '../category/Category_api';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { useGlobalContext } from '../../Context';
const Sidebar = () => {
  const [selectedValued, setSelectedValued] = useState('');
  const [holCatgData, setHolCatgData] = useState([]);
  const navigate = useNavigate(); 
  const { type } = useParams();
  let category = Category_api;

  // for filter product 
  const { filterProdcut: { sortByPrice , byStock , fastDelivery , sort , priceRange }, dispatchFilterProduct , } = useGlobalContext();

  useEffect(() => {
    const allCatg = { name: 'all' , img : ""  , id: 6,};
    const updatedCat = [allCatg ,...Category_api]
    setHolCatgData(updatedCat)
    console.log(updatedCat);
  }, [type]);

  const dropdownOptions = holCatgData.map((catgName) => ({
    key: catgName.name,
    text: catgName.name,
    value: catgName.name,
  }));
  const handleDropdownChange = (event , data) => {
    const selectedCategory = data.value;
    setSelectedValued(selectedCategory);
    if(selectedCategory==='all'){
      navigate('/products');
    }else{
      navigate(`/category/${selectedCategory}`);
    }
  }
  // console.log(selectedValued);
  useEffect(() => {
    if (type) {
      setSelectedValued(type);
    }
    // setSelectedValued(type);
  }, [type]);
  return (
    <div className='sidebar'>
      <div className="selct_catg">
        <p className='cat_heading'> Choose a category </p> 
        <Dropdown
          placeholder='Select a category'
          fluid
          search
          selection
          options={dropdownOptions}
          onChange={handleDropdownChange}
          value={selectedValued}
          className='sel_cat_dropdown'
        />
      </div>
      <div className="asc_des">
        <div className="asc_value">
          <input type="radio" id='ascending' className='ascending cur_point mr-6' name='asc_dec_filter' onChange={() => dispatchFilterProduct({
            type : "SORT_BY_PRICE",
            payload : 'lowToHigh'
          })} checked = { sort==="lowToHigh" ? true : false }/>
          <label htmlFor="ascending txt_uppercase" className='asc_des_lbl'> Ascending </label>
        </div>
        <div className="des_value">
          <input type="radio" id='desending' className='desending cur_point mr-6' name='asc_dec_filter' 
           onChange={() => dispatchFilterProduct({
            type : "SORT_BY_PRICE",
            payload : 'highTolow'
          })} checked = { sort==="highTolow" ? true : false } />
          <label htmlFor="desending txt_uppercase" className='asc_des_lbl'> Desending </label>
        </div>
        <div className="fast_delivery_sec mt-16">
          <input type="checkbox" id='fast_delivery' className='fast_delivery cur_point mr-6' onChange={() => dispatchFilterProduct({
            type : "FAST_DELIVERY"
          })} checked = { fastDelivery === true ? true : false }  />
          <label htmlFor="fast_delivery" className='txt_uppercase'> Fast Delivery Only </label>
        </div>
        <div className="oos_sec mt-16">
          <input type="checkbox" id='out_of_stock' className='out_of_stock cur_point mr-6' onChange={() => dispatchFilterProduct({
            type : "OUT_OF_STOCK",
          })} checked = {byStock}/>
          <label htmlFor="out_of_stock" className='txt_uppercase'> remove out of stock </label>
        </div>
        <div className="price_range mt-16">
          <input type="radio" id='zero_to_onethousand' className='low_price cur_point mr-6' name='price_range' 
           onChange={() => dispatchFilterProduct({
            type : "SORT_BY_RANGE",
            payload : 'low_range'
          })} checked = {priceRange === "low_range" ? true : false } />
          <label htmlFor="zero_to_onethousand" className='price_range_label'> 0 - 1000 </label>
        </div>
        <div className="price_range mt-16">
          <input type="radio" id='onethousand_to_twothousand' className='med_price cur_point mr-6' name='price_range' 
           onChange={() => dispatchFilterProduct({
            type : "SORT_BY_RANGE",
            payload : 'med_range'
          })} checked = {priceRange === "med_range" ? true : false } />
          <label htmlFor="onethousand_to_twothousand" className='price_range_label'> 1000 - 2000 </label>
        </div>
        <div className="price_range mt-16">
          <input type="radio" id='twothousand_to_threethousand' className='high_price cur_point mr-6' name='price_range' 
           onChange={() => dispatchFilterProduct({
            type : "SORT_BY_RANGE",
            payload : 'high_range'
          })} checked = {priceRange === "high_range" ? true : false } />
          <label htmlFor="twothousand_to_threethousand" className='price_range_label'> 2000 - 3000 </label>
        </div>
        <div className="price_range mt-16">
          <input type="radio" id='greater_than_threethousand' className='extra_high_range cur_point mr-6' name='price_range' 
           onChange={() => dispatchFilterProduct({
            type : "SORT_BY_RANGE",
            payload : 'extra_high_range'
          })} checked = {priceRange === "extra_high_range" ? true : false } />
          <label htmlFor="greater_than_threethousand" className='price_range_label'> 3000+ </label>
        </div>
        <div className="remove_filter_btn cur_point" onClick={() => dispatchFilterProduct({
            type : "REMOVE_FILTER",
          })}>
          <p> Remove Filter </p>
        </div>
      </div>
    </div>
  )
}

// const handleFastDeliveryChange = () => {
//   dispatch({ type: 'TOGGLE_FAST_DELIVERY' });
// };
export default Sidebar
