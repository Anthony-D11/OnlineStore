import ProductsDAO from "../dao/productsDAO.js"
import validateInput from "../input_validation.js";

export default class ProductsCtrl {
    static async listProducts(req, res, next) {
        try {
            const productResponse = await ProductsDAO.listProducts().toArray();
            res.json({"status": "success", "products": productResponse})
        }
        catch(err) {
            res.status(500).json({"error": err});
        }
    }
    static async getProduct(req, res, next) {
        try {
            const productId = req.params.product_id;
            const validationResult = validateInput("general", productId);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Malformed product id"})
            }
            const productResponse = await ProductsDAO.getProduct(productId);
            res.json({"status": "success", "product": productResponse});
        }
        catch(err) {
            res.status(500).json({"error": err});
        }
    }
}