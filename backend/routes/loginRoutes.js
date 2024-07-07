// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/student');
const Mentor = require('../models/mentor');
const Investor = require('../models/investor');
const { getDB, connectDB } = require('../config/db');

// Mapping user roles to their respective Mongoose models
const roleModels = {
  Student: Student,
  Mentor: Mentor,
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
