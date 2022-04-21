const express = require("express");
const router = express.Router();
const { UsercourseApi } = require("../../controllers");
const { Auth } = require("../../middlewares/auth");

router.get("/getCourses", Auth, UsercourseApi.getCourses);

module.exports = router;
