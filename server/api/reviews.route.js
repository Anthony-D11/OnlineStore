import express from "express"
// import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get((req, res) => res.send("hello"))

export default router