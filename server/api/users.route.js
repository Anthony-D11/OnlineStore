import express from "express"
import UsersCtrl from "./users.controller.js"

const router = express.Router()

router.route("/new").post(UsersCtrl.addUser)
router.route("/update/:id").put(UsersCtrl.updateUser)

export default router