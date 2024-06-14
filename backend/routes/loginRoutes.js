// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Student = require('../models/student');
const Mentor = require('../models/mentor');
const Investor = require('../models/investor');
const bcrypt = require('bcrypt');

// Mapping user roles to their respective Mongoose models
const roleModels = {
  Student: Student,
  Mentor: Mentor,
  Investor: Investor,
};

router.post('/', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Get the corresponding model based on user role
    const RoleModel = roleModels[user.role];
    if (!RoleModel) {
      return res.status(500).json({ message: 'Invalid user role' });
    }

    // Find the user profile in the corresponding collection
    const userProfile = await RoleModel.findOne({ email });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Return the user email, role, and profile
    res.json({ email: user.email, role: user.role, id: user._id,uid:userProfile._id });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
