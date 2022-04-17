const { CourseApi } = require("../../controllers");
const { Auth, InstructorAuth } = require("../../middlewares/auth");
const { CourseValidation } = require("../../middlewares/validate");
const express = require("express");
const router = express.Router();

router.get("/getAll", CourseApi.getAll);
router.get("/getDetail/:id", CourseApi.getDetails);
router.post(
  "/create/:categoryId",
  Auth,
  InstructorAuth,
  CourseValidation,
  CourseApi.create
);
router.put("/active/:courseId", CourseApi.active);
router.put("/suspend/:courseId", CourseApi.suspend);

module.exports = router;
