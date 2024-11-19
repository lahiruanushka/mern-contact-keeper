const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helper function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

// @desc Register user
// @route POST /api/auth/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // Check if email is already taken
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Email address is already taken");
  }

  // Check if username is already taken
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username is already taken");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Send response with token if user is created successfully
  if (user) {
    const token = generateToken(user);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login user
// @route POST /api/auth/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Find user by email
  const user = await User.findOne({ email });

  // Compare password and generate token if valid
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Email or password not valid");
  }
});

// @desc Get current user information
// @route GET /api/auth/me
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = { registerUser, loginUser, currentUser };
