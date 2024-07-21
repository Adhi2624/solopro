// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');
const Investor = require('../models/Investor');
const Entrepreneur=require('../models/Entrepreneur');
const { getDB, connectDB } = require('../config/db');

// Mapping user roles to their respective Mongoose models
const roleModels = {
  Student: Student,
  Mentor: Mentor,
  Entrepreneur:Entrepreneur,
  Investor: Investor,
};

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("user found")
    
    const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword)    
    console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const RoleModel = roleModels[user.role];
    if (!RoleModel) {
      return res.status(500).json({ message: 'Invalid user role' });
    }

    const userProfile = await db.collection(RoleModel.collection.name).findOne({ email });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json({ email: user.email, role: user.role, id: user._id, uid: userProfile._id });
    console.log({ email: user.email, role: user.role, id: user._id, uid: userProfile._id });
  } catch (error) {
    console.error('Server error: ', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
