import React, {useState} from 'react'
import './product.css'

const Product = ({id, name, image, description, quantity}) => {
    return (
    <a className={`featured-card-view`} href={`/product/${id}`}>
        <div className="featured-card-container mx-auto card">
            <div className="featured-card-image-container">
                <img src={image} alt="" className="featured-card-image" />
            </div>
            <div className="featured-card-title-container">
                <h5 className="featured-card-title">{name}</h5>
            </div>
        </div>
    </a>
    )
}

export default Product