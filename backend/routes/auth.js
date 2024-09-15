// routes/auth.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Auth with Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google auth callback
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:5173/login"); // Redirect to frontend on successful login
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Get current user
router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
