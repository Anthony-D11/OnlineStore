import ProductsDAO from "../dao/productsDAO.js"

export default class ProductsCtrl {
    static async addProduct(req, res, next) {
        try {
            const name = req.body.name
            const userName = req.body.username
            const password = req.body.password
            const productResponse = await ProductsDAO.addProduct(name, userName, password)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async updateProduct(req, res, next) {
        try {
            const userId = req.params.userid
            const name = req.body.name
            const userName = req.body.username
            const password = req.body.password
            const productResponse = await ProductsDAO.updateProduct(userId, name, userName, password)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async listProducts(req, res, next) {
        try {
            const productResponse = await ProductsDAO.listProducts().toArray();
            res.json({"status": "success", "products": productResponse})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async getProduct(req, res, next) {
        try {
            const productId = req.params.product_id
            const productResponse = await ProductsDAO.getProduct(productId)
            res.json({"status": "success", "product": productResponse})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}