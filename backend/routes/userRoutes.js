const express = require('express');
const router = express.Router();
const multer = require('multer');
const { connectDB } = require('../config/db'); // Assuming you have a module to get the database instance

const upload = multer();

router.post('/', async (req, res) => {
  console.log(req);
  const db = connectDB(); // Get the database instance
  const { email, password, userType, ...userData } = req.body;
  try {
    const user = { email, password, role: userType };
    await (await db).collection('users').insertOne(user);
    console.log("Stored in users collection");

    let profileData;
    const { phone, linkedin, profileImage, institution, nativePlaceOrWork } = userData;

    if (userType === 'Student') {
      const { git, collegeName, course, collegeLocation, collegeIdPhoto } = userData;
      profileData = { phone, email, linkedin, git, collegeName, course, collegeLocation, collegeIdPhoto, profileImage, institution, nativePlaceOrWork };
      await (await db).collection('students').insertOne(profileData);
      console.log("Stored in students collection");
    } else if (userType === 'Mentor') {
      const { areaOfExpertise, experience, proofImage, availableToMentor, mentorshipCount } = userData;
      profileData = { phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToMentor, mentorshipCount };
      await (await db).collection('mentors').insertOne(profileData);
      console.log("Stored in mentors collection");
    } else if (userType === 'Investor') {
      const { areaOfExpertise, experience, proofImage, availableToInvest, investmentCount, investmentAmount } = userData;
      profileData = { phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToInvest, investmentCount, investmentAmount };
      await (await db).collection('investors').insertOne(profileData);
      console.log("Stored in investors collection");
    }

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
