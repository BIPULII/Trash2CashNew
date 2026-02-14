require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const adminData = {
      name: 'Admin User',
      email: 'admin@trash2cash.com',
      password: 'Admin@123', // Change this to your desired password
      phone: '1234567890',
      role: 'admin'
    };

    // Hash password
    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    // Check if admin exists
    const adminExists = await User.findOne({ email: adminData.email });

    if (adminExists) {
      console.log('Admin user already exists');
    } else {
      const admin = await User.create(adminData);
      console.log('✅ Admin user created successfully');
      console.log('Email:', adminData.email);
      console.log('Password: Admin@123 (change this in production)');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
