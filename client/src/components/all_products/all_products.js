import React, {useEffect, useState} from 'react';
import Product from '../product/product';
import './all_products.css'
import axios from 'axios';

const defaultProductImage = require('../../assets/default_product_image.jpg');
const base_url = process.env["REACT_APP_BACKEND_URL"];
const product_url = base_url + "/products";

class AllProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            productList: []
        };
        this.fetchProducts = this.fetchProducts.bind(this);

    }

    componentDidMount() {
        this.fetchProducts();
    }

    async generateProducts(data) {
        let results = [];
        for (let i = 0; i < data["products"].length; i++) {
            const product = data["products"][i];
            const product_name = product["name"]
            const product_image = require("../../assets/" + product["image"])
            const product_id = product["_id"]
            results.push(
                <Product id= {product_id} name={product_name}
                    image={product["image"] !== "" ? product_image : defaultProductImage} description={product["description"]} quantity={product["quantity"]}
                />
            )
        }
        await this.setProductList([]);
        this.setProductList(results);
    }

    async setProductList(productListIn) {
        return new Promise((resolve, reject) => {
            this.setState({
                productList: productListIn
            }, () => {
                resolve("Done");
            });
            
        })
    }

    async fetchProducts() {
        axios.get(product_url + "/list")
        .then((res) => {
            this.generateProducts(res.data);
        })  
    }

    render() {  
        return (
        <div className="section-section container">
            <div className="favorite-movies-header">
                <h1 className="favorite-movies-title">All Products</h1>
            </div>
            <div className="favorite-movies-body">
                <div id="movie-collection" className="movie-collection">
                    {this.state.productList}
                </div>
            </div>
        </div>
        )
    }
}

export default AllProducts;