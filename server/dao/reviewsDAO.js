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
    static addReview(username, productId, rating, comment) {
        try{
            const reviewDoc = {
                username: username,
                product_id: productId,
                rating: rating,
                comment: comment 
            }
            return reviews.insertOne(reviewDoc)
        } catch(err) {
            console.error(`Unable to add review: ${err}`)
            return {"error": e}
        }

    }
    static updateReview(reviewId, rating, comment) {
        try{
            return reviews.updateOne(
                {_id: ObjectId(reviewId)},
                {$set: {rating: rating, comment: comment}}
            )
        } catch(err) {
            console.error(`Unable to update review: ${err}`)
            return {"error": e}
        }

    }
    static listReviews(productId) {
        try{
            return reviews.find(
                {product_id: productId}
            )
        } catch(err) {
            console.error(`Unable to list reviews for product ${productId}: ${err}`)
            return {"error": e}
        }

    }
}