const express = require("express");
const router = express.Router();
const { CourseApi, StudentInstructorApi } = require("../../controllers");
const { Auth, InstructorAuth, InstructorCourseAuth, InCourseAuth } = require("../../middlewares/auth");
const { CourseValidation } = require("../../middlewares/validate");

const upload = require("../../utils/multer.js");

router.use("/:courseId/topic", Auth, InCourseAuth, require("./topic/topic"));
router.get("/getAll", CourseApi.getAll);
router.get("/getDetail/:id", CourseApi.getDetails);
router.post("/create/:categoryId", upload.single("courseImageUrl"), Auth, InstructorAuth, CourseValidation, CourseApi.create);
router.put("/edit/:courseId", upload.single("courseImageUrl"), Auth, InstructorAuth, InstructorCourseAuth, CourseValidation, CourseApi.edit);
router.delete("/delete/:courseId", Auth, InstructorAuth, InstructorCourseAuth, CourseApi.delete);
router.put("/active/:courseId", CourseApi.active);
router.put("/suspend/:courseId", CourseApi.suspend);

module.exports = router;
