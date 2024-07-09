const express = require('express');
const { getDB } = require('../config/db');
const router = express.Router();

// Middleware to get DB instance
const dbMiddleware = async (req, res, next) => {
  req.db = getDB();
  next();
};

// Get all mentors
router.get('/getmentors', dbMiddleware, async (req, res) => {
  try {
    const db = req.db;
    const mentors = await db.collection('mentors').find().toArray();
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all investors
router.get('/getinvestors', dbMiddleware, async (req, res) => {
  try {
    const db = req.db;
    const investors = await db.collection('investors').find().toArray();
    res.json(investors);
  } catch (error) {
    console.error('Error fetching investors:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all students
router.get('/getallstudents', dbMiddleware, async (req, res) => {
  try {
    const db = req.db;
    const students = await db.collection('students').find().toArray();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get student count
router.get('/api/students/count', dbMiddleware, async (req, res) => {
  try {
    const db = req.db;
    const count = await db.collection('students').countDocuments();
    res.json({ count, diff: 0 }); // Replace 0 with actual diff if applicable
    
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get mentor count
router.get('/api/mentors/count', dbMiddleware, async (req, res) => {
  try {
    const db = req.db;
    const count = await db.collection('mentors').countDocuments();
    res.json({ count, diff: 0 }); // Replace 0 with actual diff if applicable
  } catch (error) {
    console.error('Error fetching mentor count:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get investor count
router.get('/api/investors/count', dbMiddleware, async (req, res) => {
  try {
    const db = req.db;
    const count = await db.collection('investors').countDocuments();
    res.json({ count, diff: 0 }); // Replace 0 with actual diff if applicable
  } catch (error) {
    console.error('Error fetching investor count:', error);
    res.status(500).send('Internal Server Error');
  }
});

//get entrepreneur count
router.get('/api/entrepreneurs/count', dbMiddleware, async (req, res) => {
  try {
    const db = req.db;
    const count = await db.collection('entrepreneurs').countDocuments();
    res.json({ count, diff: 0 }); // Replace 0 with actual diff if applicable
  } catch (error) {
    console.error('Error fetching entrepreneur count:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
