const express = require("express");
const router = express.Router();
const { NotificationApi } = require("../../controllers");
const { Auth } = require("../../middlewares/auth");

router.get("/getAll", Auth, NotificationApi.getAll);
router.put("/setView/:notificationId", Auth, NotificationApi.setView);
router.delete("/delete/:notificationId", Auth, NotificationApi.delete);

module.exports = router;
