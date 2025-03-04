import UsersDAO from "../dao/usersDAO.js"

export default class UsersCtrl {
    static async addUser(req, res, next) {
        try {
            const name = req.body.name
            const userName = req.body.username
            const password = req.body.password
            const userResponse = UsersDAO.addUser(name, userName, password)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async updateUser(req, res, next) {
        try {
            const userId = req.params.userid
            const name = req.body.name
            const userName = req.body.username
            const password = req.body.password
            const userResponse = UsersDAO.updateUser(userId, name, userName, password)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}