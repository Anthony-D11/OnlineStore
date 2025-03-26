import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/add").post(ReviewsCtrl.addReview)
router.route("/list/:product_id").get(ReviewsCtrl.listReviews)

export default router