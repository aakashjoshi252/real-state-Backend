const express = require("express");
const userController = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.post("/register", userController.createUser);
userRoutes.post("/login", userController.loginUser);

module.exports = userRoutes;