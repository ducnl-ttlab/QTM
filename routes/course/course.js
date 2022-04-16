const { CourseApi } = require("../../controllers");

const express = require("express");
const router = express.Router();

router.get("/getAll", CourseApi.getAll);
router.get("/getDetail/:id", CourseApi.getDetails);

module.exports = router;
