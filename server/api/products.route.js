import express from "express"
import ProductsCtrl from "./products.controller.js"

const router = express.Router()

router.route("/list").get(ProductsCtrl.listProducts)
router.route("/get-product/:product_id").get(ProductsCtrl.getProduct)

export default router