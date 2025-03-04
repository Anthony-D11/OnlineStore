import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/new").post(ReviewsCtrl.addReview)
router.route("/update/:id").put(ReviewsCtrl.updateReview)

export default router