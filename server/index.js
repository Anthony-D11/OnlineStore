import express from "express"
import cors from "cors"
import server from "./server.js"
import { MongoClient, ServerApiVersion } from "mongodb"
import UsersDAO from "./dao/usersDAO.js"
import ProductsDAO from "./dao/productsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

const mongo_username = process.env["MONGODB_USERNAME"]
const mongo_password = process.env["MONGODB_PASSWORD"]
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vvdon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const port = 4000
const mongo_client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
  
mongo_client.connect().catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
  await UsersDAO.injectDB(client)
  await ProductsDAO.injectDB(client)
  await ReviewsDAO.injectDB(client)

  server.listen(port, () => {
      console.log(`Server listening on port ${port}`)
  })
})

