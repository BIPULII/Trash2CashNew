require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const adminEmail = 'admin@trash2cash.com';
    const adminPassword = 'Admin@123';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email:', adminEmail);
      console.log('If you need to reset, delete this user from MongoDB and run again.');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      phone: '1234567890',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📧 Email: admin@trash2cash.com');
    console.log('🔑 Password: Admin@123');
    console.log('');
    console.log('⚠️  Change this password in production!');
    console.log('Admin ID:', admin._id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
