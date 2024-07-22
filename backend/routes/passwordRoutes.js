const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { getDB } = require('../config/db');

// Email service configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;

    await db.collection('users').updateOne({ email }, { $set: { otp } });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ otp });
  } catch (error) {
    console.error('Server error: ', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/update_password', async (req, res) => {
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

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').updateOne({ email }, { $set: { password: hashedPassword, otp: null } });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Server error: ', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
