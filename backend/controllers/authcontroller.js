// controllers/authController.js

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { getDB } = require('../config/db');

const ademail = process.env.EMAIL_USERNAME;
const adpw = process.env.EMAIL_PASSWORD;

// Email service configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: ademail,
    pass: adpw,
  },
  tls: {
    rejectUnauthorized: false
  }
});



const forgotPassword = async (req, res) => {
  const { email } = req.body;
console.log(ademail,adpw)
  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 90 * 1000; // 90 seconds from now

    await db.collection('users').updateOne({ email }, { $set: { otp, otpExpiry } });

    const mailOptions = {
      from: ademail,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It will expire in 90 seconds.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




const updatePassword = async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired' });
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
