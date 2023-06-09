const express = require("express");
const jwt = require("jsonwebtoken");

const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
