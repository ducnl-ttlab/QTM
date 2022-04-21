const express = require("express");
const router = express.Router();
const { AdminApi } = require("../../controllers");
router.use("/instructors", AdminApi.getInstructors);

module.exports = router;
