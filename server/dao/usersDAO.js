import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if(users) {
            return
        }
        try {
            users = await conn.db("ecommerce_db").collection("users")
        } catch(err) {
            console.error(`Unable to establish collection handles in usersDAO: ${err}`)
        }
    }
    static async addUser(name, userName, password) {
        try{
            const userDoc = {
                name: name,
                username: userName,
                password: password 
            }
            return await users.insertOne(userDoc)
        } catch(err) {
            console.error(`Unable to add user: ${err}`)
            return {"error": e}
        }

    }
    static async updateUser(userId, name, userName, password) {
        try{
            return await users.updateOne(
                {_id: ObjectId(userId)},
                {$set: {name: name, username: userName, password: password}}
            )
        } catch(err) {
            console.error(`Unable to update user: ${err}`)
            return {"error": e}
        }

    }
}