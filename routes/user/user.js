const express = require("express");
const router = express.Router();
const { UserApi } = require("../../controllers");
const { Auth } = require("../../middlewares/auth");

router.get("/info", Auth, UserApi.getInfo);

module.exports = router;
