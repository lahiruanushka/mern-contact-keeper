import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactsRouter from "./routes/contactRoutes.js";
import authRouter from "./routes/authRoutes.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";

// Initialize dotenv config
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Use the router for the /api/contacts endpoint
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDb();
});
