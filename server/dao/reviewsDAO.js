import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews) {
            return
        }
        try {
            reviews = await conn.db("ecommerce_db").collection("reviews")
        } catch(err) {
            console.error(`Unable to establish collection handles in reviewsDAO: ${err}`)
        }
    }
    static async addReview(userId, productId, rating, comment) {
        try{
            const reviewDoc = {
                user_id: userId,
                product_id: productId,
                rating: rating,
                comment: comment 
            }
            return await reviews.insertOne(reviewDoc)
        } catch(err) {
            console.error(`Unable to add review: ${err}`)
            return {"error": e}
        }

    }
    static async updateReview(reviewId, rating, comment) {
        try{
            return await reviews.updateOne(
                {_id: ObjectId(reviewId)},
                {$set: {rating: rating, comment: comment}}
            )
        } catch(err) {
            console.error(`Unable to update review: ${err}`)
            return {"error": e}
        }

    }
}