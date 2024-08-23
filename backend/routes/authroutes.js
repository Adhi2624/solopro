// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { forgotPassword, updatePassword } = require('../controllers/authcontroller');

router.post('/forgot_password', forgotPassword);
router.post('/update_password', updatePassword);

module.exports = router;
