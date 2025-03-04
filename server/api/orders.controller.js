import OrdersDAO from "../dao/ordersDAO.js"

export default class OrdersCtrl {
    static async createOrder(req, res, next) {
        try {
            const userId = req.body.user_id
            const productId = req.body.product_id
            const quantity = req.body.quantity
            const orderResponse = OrdersDAO.createOrder(userId, productId, quantity)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async cancelOrder(req, res, next) {
        try {
            const orderId = req.params.Order_id
            const orderResponse = OrdersDAO.cancelOrder(orderId)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}