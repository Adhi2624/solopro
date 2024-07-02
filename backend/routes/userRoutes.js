const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const Investor = require('../models/Investor');
const User = require('../models/User'); // Assuming you have a User model for basic user info
const sendWelcomeEmail = require('../mailtemplates/registerMail');
const sendMeetingEmail = require('../mailtemplates/meetingconfirm');

router.post('/', async (req, res) => {
  const { email, password, userType, ...userData } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      role: userType
    });
    await user.save();

    let profileData;
    const { phone, linkedin, profileImage, institution, nativePlaceOrWork, name } = userData;

    if (userType === 'Student') {
      const { git, collegeName, course, collegeLocation, collegeIdPhoto } = userData;
      profileData = {
        name,
        phone,
        email,
        linkedin,
        git,
        collegeName,
        course,
        collegeLocation,
        collegeIdPhoto,
        profileImage,
        institution,
        nativePlaceOrWork
      };
      const student = new Student(profileData);
      await student.save();
    } else if (userType === 'Mentor') {
      const { areaOfExpertise, experience, proofImage, availableToMentor, mentorshipCount } = userData;
      profileData = {
        name,
        phone,
        email,
        linkedin,
        areaOfExpertise,
        experience,
        profileImage,
        institution,
        nativePlaceOrWork,
        proofImage,
        availableToMentor,
        mentorshipCount
      };
      const mentor = new Mentor(profileData);
      await mentor.save();
    } else if (userType === 'Investor') {
      const { areaOfExpertise, experience, proofImage, availableToInvest, investmentCount, investmentAmount } = userData;
      profileData = {
        name,
        phone,
        email,
        linkedin,
        areaOfExpertise,
        experience,
        profileImage,
        institution,
        nativePlaceOrWork,
        proofImage,
        availableToInvest,
        investmentCount,
        investmentAmount
      };
      const investor = new Investor(profileData);
      await investor.save();
    }
    
    sendWelcomeEmail(req.body.name, req.body.email);
    res.status(201).json({ message: 'User created successfully' });
    // sendMeetingEmail(req.body.)
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
