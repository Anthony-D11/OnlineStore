import UsersDAO from "../dao/usersDAO.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validateInput from "../input_validation.js";

const JWT_SECRET_KEY = process.env["JWT_SECRET_KEY"];
const salt_length = 12;

export default class UsersCtrl {
    static async register(req, res, next) {
        try {
            const name = req.body.name
            const userName = req.body.username
            const password = req.body.password

            let validationResult = validateInput("general", name);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            validationResult = validateInput("username", userName);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            validationResult = validateInput("password", password);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }

            const findUserResponse = await UsersDAO.findUserByUsername(userName);
            if (findUserResponse) {
                return res.status(409).json({status: error, message: "User with this username already exists"})
            }

            const passwordHash = await bcrypt.hash(password, salt_length);
            const addUserResponse = await UsersDAO.addUser(name, userName, passwordHash);
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
            let validationResult = validateInput("username", userName);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            validationResult = validateInput("password", password);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            const userResponse = await UsersDAO.findUserByUsername(userName);
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
                maxAge: 3600 * 600 * 24
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
            let validationResult = validateInput("username", userName);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            validationResult = validateInput("password", oldPassword);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            validationResult = validateInput("password", newPassword);
            if (!validationResult.isValid) {
                return res.status(400).json({status: validationResult.error, message: "Invalid input"})
            }
            
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
            const token = jwt.sign(payload, JWT_SECRET_KEY, {"expiresIn": "1d"})
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3600 * 600 * 24
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
                res.json({name: decoded["name"], username: decoded["username"] });
            } catch (error) {
                res.status(401).json({ message: 'Invalid or expired token' });
            }
        }
        catch(err) {
            res.status(500).json({"error": err})
        }
    }
}