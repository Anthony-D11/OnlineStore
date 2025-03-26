import {ObjectId} from "mongodb"

let products;

export default class ProductsDAO {
    static async injectDB(conn) {
        if(products) {
            return
        }
        try {
            products = await conn.db("ecommerce_db").collection("products")
        } catch(err) {
            console.error(`Unable to establish collection handles in productsDAO: ${err}`)
        }
    }
    static async addProduct(name, description, quantity) {
        try{
            const productDoc = {
                name: name,
                description: description,
                quantity: quantity 
            }
            return await products.insertOne(productDoc)
        } catch(err) {
            console.error(`Unable to add product: ${err}`)
            return {"error": e}
        }

    }
    static async updateProduct(productId, name, description, quantity) {
        try{
            return await products.updateOne(
                {_id: ObjectId(productId)},
                {$set: {name: name, description: description, quantity: quantity}}
            )
        } catch(err) {
            console.error(`Unable to update product: ${err}`)
            return {"error": e}
        }

    }
    static listProducts() {
        try{
            return products.find({});
        } catch(err) {
            console.error(`Unable to list products: ${err}`)
            return {"error": e}
        }
    }
    static getProduct(productId) {
        try{
            return products.findOne({_id: ObjectId.createFromHexString(productId)});
        } catch(err) {
            console.error(`Unable to get the information of product ${productId}: ${err}`)
            return {"error": e}
        }
    }
}