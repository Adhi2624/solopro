const express = require('express');
const router = express.Router();
const { registerMentor } = require('../controllers/mentorController');

router.post('/register', registerMentor);

module.exports = router;
