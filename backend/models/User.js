// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please provide a name"],
//     trim: true,
//     maxlength: [50, "Name cannot exceed 50 characters"]
//   },
//   email: {
//     type: String,
//     required: [true, "Please provide an email"],
//     unique: true,
//     lowercase: true,
//     match: [
//       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//       "Please provide a valid email"
//     ]
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//     minlength: [6, "Password must be at least 6 characters"]
//   },
//   phone: {
//     type: String,
//     required: [true, "Please provide a phone number"],
//     trim: true
//   },
//   role: {
//     type: String,
//     enum: ["user"],
//     default: "user"
//   },
//   isEmailVerified: {
//     type: Boolean,
//     default: false
//   },
//   profilePicture: {
//     type: String,
//     default: ""
//   },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
//     country: String
//   },
//   recyclingStats: {
//     totalItemsRecycled: {
//       type: Number,
//       default: 0
//     },
//     totalEarnings: {
//       type: Number,
//       default: 0
//     },
//     environmentalImpact: {
//       carbonSaved: {
//         type: Number,
//         default: 0
//       },
//       wasteReduced: {
//         type: Number,
//         default: 0
//       }
//     }
//   }
// }, {
//   timestamps: true
// });

// // Hash password before saving
// UserSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Compare password method
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", UserSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);