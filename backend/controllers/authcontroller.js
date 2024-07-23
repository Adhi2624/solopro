// controllers/authController.js

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { getDB } = require('../config/db');
require('dotenv').config();
// Use environment variables for sensitive information
const ademail = process.env.EMAIL_USERNAME;
const adpw = process.env.EMAIL_PASSWORD;

// Email service configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // For port 587, use STARTTLS
  auth: {
    user: ademail,
    pass: adpw,
  },
  tls: {
    rejectUnauthorized: false // Consider setting to true in production
  }
});

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    // const otpExpiry = Date.now() + 90 * 1000; // 90 seconds from now

    // await db.collection('users').updateOne({ email }, { $set: { otp, otpExpiry } });

    const mailOptions = {
      from: ademail,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It will expire in 90 seconds.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ otp });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { email, password, otp } = req.body;
  console.log(req.body);
  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').updateOne(
      { email },
      { $set: { password: hashedPassword, otp: null, otpExpiry: null } }
    );

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  forgotPassword,
  updatePassword,
};
