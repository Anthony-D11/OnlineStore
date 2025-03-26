import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/nav_bar/nav_bar";
import axios from "axios";

const base_url = "http://localhost:4000/api/v1/products"
let defaultProductImage = require('../assets/default_product_image.jpg');


const ProductPage = () => {
    const [reviews, setReviews] = useState([{"username": "anthony-d11", "comment": "Good"}]);
    const [product, setProduct] = useState({})
    const { product_id } = useParams();
    useEffect(() => {
        axios.get(base_url + "/get-product/" + product_id)
        .then((res) => {
            const data = res.data.product;
            data.image = require("../assets/" + data.image);
            setProduct(data);
        })
    }, [])

    return (
        <>
            <NavBar/>
            <div className="section-section container">
                <div className="product-details">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 product-image-container product-column">
                                <img src={product["image"] !== "" ? product["image"]: defaultProductImage} alt="about-me" className="product-image"/>
                            </div>
                            <div className="col-md-6 product-column">
                                <div className="">
                                    <h2>{product["name"]}</h2>
                                </div>
                                <div className="description">Product details: {product["description"]}</div>
                                <div className="price">${product["price"]}</div>
                                <div className="stock">In stock: {product["quantity"]}</div>
                                <form className="buy-form">
                                    <div className="quantity-container">
                                        <label>
                                            Quantity: <input className="quantity" type="number" name="quantity" />
                                        </label>
                                    </div>
                                    <button className="buy-button" type="submit">Buy Now</button>
                                </form>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-section container">
                <div className="product-reviews">
                    <div className="favorite-movies-header">
                        <h1 className="favorite-movies-title">Reviews</h1>
                    </div>
                    <div className="favorite-movies-body review-list">
                        <div className="review-item">
                            <div id="movie-collection" className="reviewer-name">
                                {reviews[0]["username"]}
                            </div>
                            <div id="" className="review-content">
                                {reviews[0]["comment"]}
                            </div>
                        </div>
                        <div className="review-item">
                            <div id="movie-collection" className="reviewer-name">
                                {reviews[0]["username"]}
                            </div>
                            <div id="" className="review-content">
                                {reviews[0]["comment"]}
                            </div>
                        </div>
                        <div className="review-item">
                            <div id="movie-collection" className="reviewer-name">
                                {reviews[0]["username"]}
                            </div>
                            <div id="" className="review-content">
                                {reviews[0]["comment"]}
                            </div>
                        </div>
                    </div>
                    <div className="add-comment">
                        <form>
                            <textarea type="text" name="comment" />
                            <br/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductPage;