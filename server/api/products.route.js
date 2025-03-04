import express from "express"
import ProductsCtrl from "./products.controller.js"

const router = express.Router()

router.route("/new").post(ProductsCtrl.addProduct)
router.route("/update/:id").put(ProductsCtrl.updateProduct)

export default router