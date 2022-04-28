const express = require("express");
const router = express.Router();
const { CourseApi, StudentInstructorApi } = require("../../controllers");
const { Auth, InstructorAuth, InstructorCourseAuth } = require("../../middlewares/auth");
const { CourseValidation } = require("../../middlewares/validate");

router.get("/getCourses", Auth, InstructorAuth, CourseApi.getInstructorCourses);
router.put("/:courseId/invite/:studentId", Auth, InstructorCourseAuth, StudentInstructorApi.invite);
router.get("/:courseId/getStudents", StudentInstructorApi.getCourseStudents);
router.put("/:courseId/kickStudent/:studentId", StudentInstructorApi.kickStudent);

module.exports = router;
