const express = require("express");
const dotenv = require("dotenv").config();
const contactsRouter = require("./routes/contactRoutes");
const authRouter = require("./routes/authRoutes")
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require('cors');
connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());


// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Allow credentials (cookies, etc.)
}));
app.use(errorHandler);

// Use the router for the /api/contacts endpoint
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
