
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected profile routes
router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);

// Protected password route
router.put("/change-password", protect, changePassword);

module.exports = router;
