const express = require("express");
const router = express.Router();
const { AdminApi } = require("../../controllers");
router.use("/users/:type", AdminApi.getUsers);

module.exports = router;
