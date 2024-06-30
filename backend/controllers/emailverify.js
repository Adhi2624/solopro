const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Correct path to your User model

router.get('/', async (req, res) => {
  const { email } = req.body; // Extract email from query parameters

  try {
    // Check if user exists with the provided email
    const user = await User.findOne({ email });

    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
