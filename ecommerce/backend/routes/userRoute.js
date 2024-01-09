const express=require("express");
const { registerUser, logoutUser, loginUser } = require("../controllers/userController");
const router=express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);


router.route("/logout").get(logoutUser);

module.exports=router