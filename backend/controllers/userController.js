// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res) => {
//   try {
//     console.log('Registration request received:', req.body);
//     const { name, email, password, phone } = req.body;

//     // Validation
//     if (!name || !email || !password || !phone) {
//       console.log('Missing fields:', { name: !!name, email: !!email, password: !!password, phone: !!phone });
//       return res.status(400).json({
//         success: false,
//         message: "Please provide all required fields",
//         missingFields: {
//           name: !name,
//           email: !email,
//           password: !password,
//           phone: !phone
//         }
//       });
//     }

//     // Check password length
//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters long"
//       });
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email: email.toLowerCase() });

//     if (userExists) {
//       console.log('User already exists:', email);
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email"
//       });
//     }

//     // Create user
//     console.log('Creating user with data:', { name, email: email.toLowerCase(), phone });
//     const user = await User.create({
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       password,
//       phone: phone.trim()
//     });

//     if (user) {
//       console.log('User created successfully:', user._id);
      
//       // Remove password from response
//       const userResponse = {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         isEmailVerified: user.isEmailVerified,
//         createdAt: user.createdAt
//       };

//       res.status(201).json({
//         success: true,
//         data: {
//           ...userResponse,
//           token: generateToken(user._id)
//         },
//         message: "User registered successfully"
//       });
//     } else {
//       console.log('Failed to create user');
//       res.status(400).json({
//         success: false,
//         message: "Invalid user data"
//       });
//     }
//   } catch (error) {
//     console.error('Registration error details:', {
//       message: error.message,
//       stack: error.stack,
//       name: error.name
//     });
    
//     // Handle specific MongoDB errors
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({
//         success: false,
//         message: "Validation Error",
//         errors: errors
//       });
//     }
    
//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists"
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Server error during registration",
//       error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//     });
//   }
// };

// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide email and password"
//       });
//     }

//     // Check for user
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         success: true,
//         data: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role: user.role,
//           token: generateToken(user._id)
//         },
//         message: "Login successful"
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login"
//     });
//   }
// };

// // @desc    Get current user
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");

//     res.json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error getting user profile"
//     });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.phone = req.body.phone || user.phone;
      
//       if (req.body.address) {
//         user.address = { ...user.address, ...req.body.address };
//       }

//       const updatedUser = await user.save();

//       res.json({
//         success: true,
//         data: {
//           _id: updatedUser._id,
//           name: updatedUser.name,
//           email: updatedUser.email,
//           phone: updatedUser.phone,
//           role: updatedUser.role,
//           address: updatedUser.address
//         },
//         message: "Profile updated successfully"
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error updating profile"
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getMe,
//   updateProfile
// };
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please add all fields'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim()
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          token: generateToken(user._id)
        },
        message: 'Registration successful'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          token: generateToken(user._id)
        },
        message: 'Login successful'
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser
};