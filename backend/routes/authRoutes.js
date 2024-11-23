import express from "express";
import {
  registerUser,
  loginUser,
  currentUser,
} from "../controllers/authController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", validateToken, currentUser);

export default router;
