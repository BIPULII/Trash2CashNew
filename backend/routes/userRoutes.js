// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getMe,
//   updateProfile
// } = require("../controllers/authController");
// const auth = require("../middleware/auth");

// // @route   POST /api/auth/register
// // @desc    Register user
// // @access  Public
// router.post("/register", registerUser);

// // @route   POST /api/auth/login
// // @desc    Login user
// // @access  Public
// router.post("/login", loginUser);

// // @route   GET /api/auth/me
// // @desc    Get current user
// // @access  Private
// router.get("/me", auth, getMe);

// // @route   PUT /api/auth/profile
// // @desc    Update user profile
// // @access  Private
// router.put("/profile", auth, updateProfile);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;