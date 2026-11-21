
const express = require("express");
const router = express.Router();
const multer = require("multer");

const { analyzeResume } = require("../controllers/resumeController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  }
});

router.post("/analyze", upload.single("resume"), analyzeResume);

module.exports = router;
