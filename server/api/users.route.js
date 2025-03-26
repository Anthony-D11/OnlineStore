import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

router.route("/register").post(UsersCtrl.register)
router.route("/sign-in").post(UsersCtrl.signIn)
router.route("/sign-out").get(UsersCtrl.signOut)
router.route("/change-password").post(UsersCtrl.changePassword)
router.route("/status").get(UsersCtrl.verifyStatus)
router.route("/update/:id").put(UsersCtrl.updateUser)

export default router