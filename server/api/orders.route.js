import express from "express"
import OrdersCtrl from "./orders.controller.js"

const router = express.Router()

router.route("/new").post(OrdersCtrl.createOrder)
router.route("/cancel/:id").delete(OrdersCtrl.cancelOrder)

export default router