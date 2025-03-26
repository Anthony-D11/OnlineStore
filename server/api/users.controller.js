import UsersDAO from "../dao/usersDAO.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET_KEY = process.env["JWT_SECRET_KEY"];
const salt_length = 12;

export default class UsersCtrl {
    static async register(req, res, next) {
        try {
            const name = req.body.name
            const userName = req.body.username
            const password = req.body.password
            const passwordHash = await bcrypt.hash(password, salt_length);
            const userResponse = await UsersDAO.addUser(name, userName, passwordHash);
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
            const userResponse = await UsersDAO.updateUser(userId, name, userName, password)
            res.json({"status": "success"})
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
    static async signIn(req, res, next) {
        try {
            const userName = req.body.username
            const password = req.body.password
            const userResponse = await UsersDAO.findUserByUsername(userName)
            if (!userResponse || !bcrypt.compareSync(password, userResponse["password_hash"])) {
                return res.status(401).json({ "message": "Invalid credentials" });
            }
            const payload = {
                "name": userResponse["name"],
                "username": userName
            }

            const token = jwt.sign(payload, JWT_SECRET_KEY, {"expiresIn": "1d"})
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3600 * 1000
            });
            res.json({"message": "Login successful"});
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }

    static async signOut(req, res, next) {
        try {
            res.clearCookie("token");
            res.json({"message": "Logout successful"});
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }

    static async changePassword(req, res, next) {
        try {
            const userName = req.body.username
            const oldPassword = req.body.old_password
            const newPassword = req.body.new_password
            const findUserResponse = await UsersDAO.findUserByUsername(userName)

            if (!findUserResponse || !bcrypt.compareSync(oldPassword, findUserResponse["password_hash"])) {
                return res.status(401).json({ "message": "Invalid credentials" });
            }

            const passwordHash = await bcrypt.hash(newPassword, salt_length);
            const updateUserResponse = await UsersDAO.updateUser(userName, passwordHash);
            const payload = {
                "name": findUserResponse["name"],
                "username": userName
            }
            res.clearCookie("token");
            const token = jwt.sign(payload, JWT_SECRET_KEY, {"expiresIn": "2h"})
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3600 * 1000
            });
            res.json({"message": "Change password successful"});
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }

    static async verifyStatus(req, res, next) {
        try {
            const token = req.cookies.token;
            
            if (!token) {
                return res.status(401).json({ message: 'Not logged in' });
            }
            try {
                const decoded = jwt.verify(token, JWT_SECRET_KEY);
                res.json({"name": decoded["name"], username: decoded["username"] });
            } catch (error) {
                res.status(401).json({ message: 'Invalid or expired token' });
            }
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}