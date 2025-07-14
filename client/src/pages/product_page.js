import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import validateInput from "../input_validation";

const base_url = process.env["REACT_APP_BACKEND_URL"];
let defaultProductImage = require('../assets/default_product_image.jpg');


export default function ProductPage() {
    const [reviews, setReviews] = useState([{}]);
    const [product, setProduct] = useState({})
    const [newReview, setNewReview] = useState("");
    const [ userState, setUserState ] = useState({});
    const location = useLocation();

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

    useEffect(() => {
        axios.get(base_url + "/users/status?timestamp=" + Date.now().toString(), { withCredentials: true })
        .then((res) => {
            setUserState({ "isLoggedIn": true, "user": res.data });
        })
        .catch((err) => {
            setUserState({ "isLoggedIn": false });
            if (err.status !== 401) {
                console.error(err);
            };
        });
    }, [location.pathname]);

    const handleAddReview = (event) => {
        event.preventDefault();
        let validationResult = validateInput("general", newReview);
        if (!validationResult.isValid) {
            alert(validationResult.error);
            return;
        }
        if (!userState.user) {
            alert("You must log in to submit reviews");
        }
        const payload = {
            "product_id": product_id,
            "username": userState.user.username,
            "rating": 5,
            "comment": newReview
        }
        axios.post(base_url + "/reviews/add", payload, {withCredentials: true})
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {console.error(err)});
    }

    const handleBuy = (event) => {
        event.preventDefault();
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
                                <div className="description">{product["description"]}</div>
                                <div className="price">${product["price"]}</div>
                                <div className="stock">In stock: {product["quantity"]}</div>
                                <form className="buy-form" onSubmit={handleBuy}>
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
