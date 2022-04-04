const express = require("express");
const router = express.Router();
const ApiAuth = require("../../controllers/auth/ApiAuth");
const auth = require("../../middlewares/auth/auth");
const upload = require("../../utils/multer");

router.post("/register", ApiAuth.register);

router.post("/login", ApiAuth.login);

module.exports = router;
