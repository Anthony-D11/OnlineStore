import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsCtrl {
    static async addReview(req, res, next) {
        try {
            const userId = req.body.user_id
            const productId = req.body.product_id
            const rating = req.body.rating
            const comment = req.body.comment
            const reviewResponse = ReviewsDAO.addReview(userId, productId, rating, comment)
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
}