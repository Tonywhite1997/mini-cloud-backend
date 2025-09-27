const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protected);

const sharedFileController = require("../controllers/sharedFileController");

router.post("/share", sharedFileController.shareFile);
router.get("/files", sharedFileController.getUserSharedFiles);
router.get("/borrowed-files", sharedFileController.getUserBorrowedFiles);
router.get("/file/:fileID", sharedFileController.getFile);
router.get("/file/download/:fileID", sharedFileController.downloadSharedFile);
router.patch(
  "/file/edit-permissions",
  sharedFileController.editRecipientPermissions
);
router.patch("/file/rename", sharedFileController.renameSharedFile);
router.patch(
  "/file/revoke-permissions",
  sharedFileController.revokeRecipientAccess
);
router.delete("/file/delete-file", sharedFileController.deleteSharedFile);

module.exports = router;
