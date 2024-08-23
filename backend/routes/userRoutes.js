const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Entrepreneur = require('../models/Entrepreneur');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const Investor = require('../models/Investor');
//const Admin = require('../models/Admin');

const sendWelcomeEmail = require('../mailtemplates/registerMail');
const sendMeetingEmail = require('../mailtemplates/meetingconfirm');

router.post('/', async (req, res) => {
  console.log(req.body);
  const { email, password, userType, ...userData } = req.body;

  let user = null;

  try {
    //const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      email,
      password: password,
      role: userType
    });
    await user.save();

    if (userType === 'Admin') {
      // const admin = new Admin({ userId: user._id });
      // await admin.save();
    } else {
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
        const { git, collegeName, course, collegeLocation, collegeIdCardImage } = userData;
        Object.assign(profileData, {
          git,
          collegeName,
          course,
          collegeLocation,
          collegeIdCardImage
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
    }

    sendWelcomeEmail(userData.name, email);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
