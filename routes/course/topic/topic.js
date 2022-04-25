const express = require("express");
const router = express.Router();
const { TopicApi } = require("../../../controllers");
router.get("/getAll", TopicApi.getAll);
router.delete("/delete/:topicId", TopicApi.delete);
router.put("/edit/:topicId", TopicApi.edit);
router.post("/create", TopicApi.create);

module.exports = router;
