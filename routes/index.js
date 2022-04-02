const express = require("express");
const router = express.Router();

router.use("/course", require("./course"));
router.use("/auth", require("./auth"));
router.use("/usercourse", require("./usercourse"));
router.use("/instructor", require("./instructor"));

module.exports = router;
