const express = require('express');
const bodyParser = require('body-parser');
const { createMeet } = require('./controllers/automeeting');

const app = express();
app.use(bodyParser.json());
// const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const Investor = require('../models/Investor');
const Entrepreneur = require('../models/Entrepreneur');
const User = require('../models/User'); 
const sendWelcomeEmail = require('../mailtemplates/registerMail');
const sendMeetingEmail = require('../mailtemplates/meetingconfirm');

app.post('/api/signup', (req,res)=>{
  const { email, password, userType, ...userData } = req.body;
  console.log(req.body);

  try {
    const hashedPassword =  bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      role: userType
    });
    console.log(user)

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
      console.log(profileData)
    } else if (userType === 'Mentor') {
      const { areaOfExpertise, experience, proofImage, availableToMentor, mentorshipCount } = userData;
      Object.assign(profileData, {
        areaOfExpertise,
        experience,
        proofImage,
        availableToMentor,
        mentorshipCount
      });
      console.log(profileData)
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
      console.log(profileData)
    } else if (userType === 'Entrepreneur') {
      const { areaOfExpertise, experience, proofImage, availableToMentor, mentorshipCount } = userData;
      Object.assign(profileData, {
        areaOfExpertise,
        experience,
        proofImage,
        availableToMentor,
        mentorshipCount
      });
      console.log(profileData)
      // const entrepreneur = new Entrepreneur(profileData);
      // await entrepreneur.save();
    }
    
    //sendWelcomeEmail(req.body.name, req.body.email);
    res.status(201).json({ message: 'User created successfully' });
    // sendMeetingEmail(req.body.)
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
