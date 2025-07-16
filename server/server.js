import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import users from "./api/users.route.js"
import products from "./api/products.route.js"
import orders from "./api/orders.route.js"
import reviews from "./api/reviews.route.js"

const server = express()
console.log(process.env["FRONTEND_URL"])
const corsOptions = {
    // origin: process.env["FRONTEND_URL"],
    origin: "http://localhost:3000",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
        "script-src": ["'self'"],
        },
    },
}
server.use(cors(corsOptions))
server.use(helmet(helmetOptions));
server.use(express.json())
server.use(cookieParser())

server.use("/api/v1/users", users)
server.use("/api/v1/products", products)
server.use("/api/v1/orders", orders)
server.use("/api/v1/reviews", reviews)

server.use("*", (req, res) => {
    res.status(404).json({error: "not found"})
})

export default server