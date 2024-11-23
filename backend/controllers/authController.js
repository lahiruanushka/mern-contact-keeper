import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import CustomError from '../utils/CustomError.js';

// @desc Register user
// @route POST /api/auth/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      throw new CustomError('All fields are mandatory', 400);
    }

    // Check if email is already taken
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new CustomError('Email address is already taken', 400);
    }

    // Check if username is already taken
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      throw new CustomError('Username is already taken', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new CustomError('User data is not valid', 400);
    }

    // Generate token and send response
    const token = generateToken(user);
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Error registering user: ' + error.message, 500);
  }
});

// @desc Login user
// @route POST /api/auth/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      throw new CustomError('All fields are mandatory', 400);
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    // Compare password and generate token if valid
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError('Email or password not valid', 401);
    }

    const token = generateToken(user);
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      },
      message: "Login successful",
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Error logging in: ' + error.message, 500);
  }
});

// @desc Get current user information
// @route GET /api/auth/me
// @access private
const currentUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new CustomError('User not authenticated', 401);
    }

    res.status(200).json({
      success: true,
      data: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
      message: "User details retrieved successfully",
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Error getting user details: ' + error.message, 500);
  }
});

export { registerUser, loginUser, currentUser };
