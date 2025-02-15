const express = require("express");
const { getFiles, createFile, renameFile, deleteFile, moveFile } = require("../controllers/fileController");

const router = express.Router();

router.get("/", getFiles);
router.post("/", createFile);
router.put("/:id", renameFile);
router.delete("/:id", deleteFile);
router.put("/:id/move", moveFile);

module.exports = router;

