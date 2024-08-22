import React from 'react'
import { Link } from 'react-router-dom'
import Category_api from './category/Category_api'

const Category = () => {
    let category = Category_api
    // console.log(category);
    return (
        <div className="main_cat">
            <div className="cat_heading">
                <h2> Categories </h2>
            </div>
            <div className="categoris">
                {
                    category?.map((currVal) => {
                        const {name , img , id} = currVal
                        return (
                            <Link to={`/category/${name}`} className="cat_link" key={id}>
                                <div className="catg_box">
                                    <div className="catg_img">
                                        <img src={`https://arbazzz640.github.io/banner/${img}`} alt="category" />
                                    </div>
                                    <div className="category_overlay">
                                    </div>
                                    <p className='cat_name'> {name} </p>
                                </div>
                            </Link >
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Category
