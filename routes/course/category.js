const { CategoryApi } = require("../../controllers");

const express = require("express");
const router = express.Router();

router.get("/getAll", CategoryApi.getAll);
router.get("/getDetail/:id", CategoryApi.getDetails);

module.exports = router;
