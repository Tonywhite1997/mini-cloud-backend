import express from "express";
const authController = require("../controllers/authController");
const notificationController = require("../controllers/notiController");

const router = express.Router();

router.use(authController.protected);

router.post("/send", notificationController.sendNotification);
router.get("/", notificationController.getMyNotifications);
router.delete("/clear", notificationController.clearMyNotifications);

module.exports = router;
