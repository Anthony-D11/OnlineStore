import ReviewsDAO from "../dao/reviewsDAO.js"
import jwt from "jsonwebtoken"

import validateInput from "../input_validation.js"

const JWT_SECRET_KEY = process.env["JWT_SECRET_KEY"];

export default class ReviewsCtrl {
    static async addReview(req, res, next) {
        try {
            const userName = req.body.username
            const productId = req.body.product_id
            const comment = req.body.comment
            
            let validationResult = validateInput("username", userName);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            validationResult = validateInput("general", productId);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            validationResult = validateInput("general", comment);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: 'Not logged in' });
            }
            try {
                const decoded = jwt.verify(token, JWT_SECRET_KEY);
            } catch (error) {
                console.log(error);
                return res.status(401).json({ message: 'Invalid or expired token' });
            }

            const reviewResponse = ReviewsDAO.addReview(userName, productId, comment)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async listReviews(req, res, next) {
        try {
            const productId = req.params.product_id
            let validationResult = validateInput("general", productId);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            
            const reviewResponse = await ReviewsDAO.listReviews(productId).toArray()
            res.json({"status": "success", "reviews": reviewResponse})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}