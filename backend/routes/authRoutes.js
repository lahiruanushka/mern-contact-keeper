const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/authController");
const validateToken = require("../middleware/validateTokenHandler");

// @route POST /api/auth/register
// @access public
router.post("/register", registerUser);

// @route POST /api/auth/login
// @access public
router.post("/login", loginUser);

// @route GET /api/auth/me
// @access private
router.get("/me", validateToken, currentUser);

module.exports = router;
