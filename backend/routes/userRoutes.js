const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const Investor = require('../models/Investor');
const Entrepreneur = require('../models/Entrepreneur');
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

    const { phone, linkedin, profileImage, institution, nativePlaceOrWork, name } = userData;
    const profileData = {
      userId: user._id,
      name,
      phone,
      email,
      linkedin,
      profileImage,
      institution,
      nativePlaceOrWork
    };

    if (userType === 'Student') {
      const { git, collegeName, course, collegeLocation, collegeIdPhoto } = userData;
      Object.assign(profileData, {
        git,
        collegeName,
        course,
        collegeLocation,
        collegeIdPhoto
      });
      const student = new Student(profileData);
      await student.save();
    } else if (userType === 'Mentor') {
      const { areaOfExpertise, experience, proofImage, availableToMentor, mentorshipCount } = userData;
      Object.assign(profileData, {
        areaOfExpertise,
        experience,
        proofImage,
        availableToMentor,
        mentorshipCount
      });
      const mentor = new Mentor(profileData);
      await mentor.save();
    } else if (userType === 'Investor') {
      const { areaOfExpertise, experience, proofImage, availableToInvest, investmentCount, investmentAmount } = userData;
      Object.assign(profileData, {
        areaOfExpertise,
        experience,
        proofImage,
        availableToInvest,
        investmentCount,
        investmentAmount
      });
      const investor = new Investor(profileData);
      await investor.save();
    } else if (userType === 'Entrepreneur') {
      const { areaOfExpertise, experience, proofImage, availableToMentor, mentorshipCount } = userData;
      Object.assign(profileData, {
        areaOfExpertise,
        experience,
        proofImage,
        availableToMentor,
        mentorshipCount
      });
      const entrepreneur = new Entrepreneur(profileData);
      await entrepreneur.save();
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
