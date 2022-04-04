const express = require("express");
const router = express.Router();
const ApiAuth = require("../../controllers/auth/ApiAuth");
const auth = require("../../middlewares/auth/auth");
const upload = require("../../utils/multer");
const { AuthValidation } = require("../../middlewares/validate/");

router.post("/register", AuthValidation, ApiAuth.register);

router.post("/login", AuthValidation, ApiAuth.login);

module.exports = router;
