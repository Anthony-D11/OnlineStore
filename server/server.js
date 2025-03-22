import express from "express"
import cors from "cors"
import users from "./api/users.route.js"
import products from "./api/products.route.js"
import orders from "./api/orders.route.js"
import reviews from "./api/reviews.route.js"

const server = express()

server.use(cors())
server.use(express.json())

server.use("/api/v1/users", users)
server.use("/api/v1/products", products)
server.use("/api/v1/orders", orders)
server.use("/api/v1/reviews", reviews)

server.use("*", (req, res) => {
    res.status(404).json({error: "not found"})
})

export default server