const express = require("express");
const router = express.Router();
const { AuthApi } = require("../../controllers");
const { auth } = require("../../middlewares/auth");
const upload = require("../../utils/multer");
const { AuthValidation } = require("../../middlewares/validate/");

router.post("/register", AuthValidation, AuthApi.register);

router.post("/login", AuthValidation, AuthApi.login);

module.exports = router;
