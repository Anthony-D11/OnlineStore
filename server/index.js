import express from "express"
import cors from "cors"
import app from "./server.js"
import { MongoClient, ServerApiVersion } from "mongodb"

const mongo_username = process.env["MONGODB_USERNAME"]
const mongo_password = process.env["MONGODB_PASSWORD"]
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vvdon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const port = 5000
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
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
})

