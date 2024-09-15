const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session"); // Use express-session instead of cookie-session
const dotenv = require("dotenv");
const cors = require("cors");

require("./models/User");
require("./services/passport"); // Load Passport configuration

dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL if different
    credentials: true, // Allows cookies and session headers to be sent
  })
);

// Express session configuration
app.use(
  session({
    secret: process.env.COOKIE_KEY, // Use a secret from environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true if using HTTPS
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log successful MongoDB connection
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
