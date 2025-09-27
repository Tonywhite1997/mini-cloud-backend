import express from "express";
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.patch(
  "/send-email-verification",
  authController.protected,
  authController.verifyEmail
);
router.patch(
  "/confirm-verification-code",
  authController.protected,
  authController.confirmVerificationCode
);
router.get("/logout", authController.logout);
router.get("/check-if-login", authController.checkIfLogin);
router.patch("/forgot-password", authController.forgotPassword);
router.patch("/reset-password", authController.resetPassword);

module.exports = router;
