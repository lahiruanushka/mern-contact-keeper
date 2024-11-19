const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/authController");
const validateToken = require("../middleware/validateTokenHandler");

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to get the current user's details, protected by the validateToken middleware
router.get("/me", currentUser);

module.exports = router;
