const express = require("express");
const router = express.Router();
const { TopicApi } = require("../../../controllers");
const { InstructorAuth } = require("../../../middlewares/auth");

router.get("/getAll", TopicApi.getAll);
router.delete("/delete/:topicId", InstructorAuth, TopicApi.delete);
router.put("/edit/:topicId", InstructorAuth, TopicApi.edit);
router.post("/create", InstructorAuth, TopicApi.create);

module.exports = router;
