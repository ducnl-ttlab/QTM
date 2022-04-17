const express = require("express");
const router = express.Router();

router.use("/category", require("./course/category"));
router.use("/course", require("./course/course"));
router.use("/user", require("./user/user"));
router.use("/auth", require("./auth/auth"));
router.use("/usercourse", require("./usercourse"));
router.use("/instructor", require("./instructor"));


module.exports = router;
