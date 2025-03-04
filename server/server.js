import express from "express"
import cors from "cors"
import users from "./api/users.route.js"

const server = express()

server.use(cors())
server.use(express.json())

server.use("/api/v1/users", users)

server.use("*", (req, res) => {
    res.status(404).json({error: "not found"})
})

export default server