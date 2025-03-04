import ProductsDAO from "../dao/productsDAO.js"

export default class ProductsCtrl {
    static async addProduct(req, res, next) {
        try {
            const name = req.body.name
            const userName = req.body.username
            const password = req.body.password
            const productResponse = ProductsDAO.addProduct(name, userName, password)
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
            const productResponse = ProductsDAO.updateProduct(userId, name, userName, password)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}