import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let orders;

export default class OrdersDAO {
    static async injectDB(conn) {
        if(orders) {
            return
        }
        try {
            orders = await conn.db("ecommerce_db").collection("orders")
        } catch(err) {
            console.error(`Unable to establish collection handles in ordersDAO: ${err}`)
        }
    }
    static async createOrder(userId, productId, quantity) {
        try{
            const orderDoc = {
                user_id: userId,
                product_id: productId,
                quantity: quantity 
            }
            return await orders.insertOne(orderDoc)
        } catch(err) {
            console.error(`Unable to create order: ${err}`)
            return {"error": e}
        }

    }
    static async cancelOrder(orderId) {
        try{
            return await orders.deleteOne(
                {_id: ObjectId(orderId)}
            )
        } catch(err) {
            console.error(`Unable to cancel order: ${err}`)
            return {"error": e}
        }

    }
}