import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

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
}