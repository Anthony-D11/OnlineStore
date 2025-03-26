import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsCtrl {
    static async addReview(req, res, next) {
        try {
            const username = req.body.username
            const productId = req.body.product_id
            const rating = req.body.rating
            const comment = req.body.comment
            const reviewResponse = ReviewsDAO.addReview(username, productId, rating, comment)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async updateReview(req, res, next) {
        try {
            const reviewId = req.params.review_id
            const rating = req.body.rating
            const comment = req.body.comment
            const reviewResponse = ReviewsDAO.updateReview(reviewId, rating, comment)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async listReviews(req, res, next) {
        try {
            const productId = req.params.product_id
            const reviewResponse = await ReviewsDAO.listReviews(productId).toArray()
            res.json({"status": "success", "reviews": reviewResponse})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}