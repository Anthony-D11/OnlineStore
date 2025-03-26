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
    static async addUser(name, userName, passwordHash) {
        try{
            const userDoc = {
                "name": name,
                "username": userName,
                "password_hash": passwordHash 
            }
            return await users.insertOne(userDoc)
        } catch(err) {
            console.error(`Unable to add user: ${err}`)
            return {"error": e}
        }
    }
    static async updateUser(userName, password) {
        try{
            return await users.updateOne(
                {"username": userName},
                {$set: {"password_hash": password}}
            )
        } catch(err) {
            console.error(`Unable to update user: ${err}`)
            return {"error": e}
        }

    }
    static async findUserByUsername(userName) {
        try{
            const userDoc = {
                "username": userName
            }
            return await users.findOne(userDoc)
        } catch(err) {
            console.error(`Unable to find user: ${err}`)
            return {"error": e}
        }
    }
}