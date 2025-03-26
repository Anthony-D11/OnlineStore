import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth";

const base_url = "http://localhost:4000/api/v1"
let defaultProductImage = require('../assets/default_product_image.jpg');


export default function ProductPage() {
    const [reviews, setReviews] = useState([{}]);
    const [product, setProduct] = useState({})
    const [newReview, setNewReview] = useState("");
    let {userState, setUserState} = useAuth();
    
    const { product_id } = useParams();

    const fetchProductDetails = () => {
        axios.get(base_url + "/products/get-product/" + product_id)
        .then((res) => {
            const data = res.data.product;
            data.image = require("../assets/" + data.image);
            setProduct(data);
        });
    }
    const fetchProductReviews = () => {
        axios.get(base_url + "/reviews/list/" + product_id)
        .then((res) => {
            setReviews(res.data.reviews);
        });
    }
    useEffect(() => {
        fetchProductDetails();
        fetchProductReviews();
    }, [])

    const handleAddReview = (event) => {
        event.preventDefault();
        const payload = {
            "product_id": product_id,
            "username": userState.user.username,
            "rating": 5,
            "comment": newReview
        }
        axios.post(base_url + "/reviews/add", payload)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {console.error(err)});
    }

    return (
        <>
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
                        {reviews.map((review, index) => (
                            <div className="review-item">
                                <div id="movie-collection" className="reviewer-name">
                                    {review["username"]}
                                </div>
                                <div id="" className="review-content">
                                    {review["comment"]}
                                </div>
                            </div>
                        ))}
                        
                    </div>
                    <div className="add-review">
                        <form onSubmit={handleAddReview}>
                            <textarea type="text" name="review" value={newReview} onChange={(e) => {setNewReview(e.target.value)}}/>
                            <br/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
