const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Student = require('../models/student');
const Mentor = require('../models/mentor');
const Investor = require('../models/investor');
const multer = require('multer');

const upload = multer(); // Configure multer as needed
// router.post('/', upload.fields([
//     { name: 'profileImage', maxCount: 1 },
//     { name: 'collegeIdPhoto', maxCount: 1 },
//     { name: 'proofImage', maxCount: 1 },
//   ]), async (req, res) => {
//     const { email, password, userType, ...userData } = req.body;
//     console.log('request received');
//     console.log(req.body)
//     try {
//       // Check if email already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         console.log("already existing");
//         return res.status(400).json({ message: 'Email already exists' });
//       }
  
//       // Create user in user collection
//       const user = new User({ email, password });
//       await user.save();
//       console.log("stored in user")
      
//       // Create user profile based on user type
//       if (userType === 'Student') {
//         const { phone, linkedin, git, collegeName, course, collegeLocation, collegeIdPhoto, profileImage, institution, nativePlaceOrWork } = userData;
//         const student = new Student({ phone, email, linkedin, git, collegeName, course, collegeLocation, collegeIdPhoto, profileImage, institution, nativePlaceOrWork });
//         await student.save();
//         console.log("stored in student");
//       } else {
//         const { areaOfExpertise, experience, proofImage } = userData;
//         if (userType === 'Mentor') {
//           const { phone, linkedin, profileImage, institution, nativePlaceOrWork, availableToMentor, mentorshipCount } = userData;
//           const mentor = new Mentor({ phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToMentor, mentorshipCount });
//           await mentor.save();
//           console.log("stored in mentor");
//         } else if (userType === "Investor") {
//           const { phone, linkedin, profileImage, institution, nativePlaceOrWork, availableToInvest, investmentCount, investmentAmount } = userData;
//           const investor = new Investor({ phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToInvest, investmentCount, investmentAmount });
//           await investor.save();
//           console.log("stored in investor");
//         }
//       }
  
//       res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
router.post('/', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'collegeIdPhoto', maxCount: 1 },
  { name: 'proofImage', maxCount: 1 },
]), async (req, res) => {
  console.log(req.body);
  const { email, password, userType, ...userData } = req.body;
  console.log('request received');
  console.log(req.body)
  try {

    const user = new User({ email, password });
    await user.save();
    console.log("stored in user")
    let profileData;
    const {phone,linkedin,profileImage,institution,nativePlaceOrWork}=userData;
    if (userType === 'Student')
        {
            const {git,collegeName,course,collegeLocation,collegeIdPhoto}=userData;
            const student = new Student({phone,email, linkedin,git,collegeName,course,collegeLocation,collegeIdPhoto,profileImage,institution,nativePlaceOrWork});
            await student.save();
            console.log("stored in student")
        }
        else
        {
            const {areaOfExpertise, experience, proofImage}=userData;
            if(userType === 'Mentor')
            {
                const {availableToMentor, mentorshipCount}=userData;
                const mentor = new Mentor({phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToMentor, mentorshipCount});
                await mentor.save();
                console.log("stored in mentor")
            }
            else if(userType === "Investor")
            {
                const {availableToInvest, investmentCount, investmentAmount}=userData;
                const investor = new Investor({phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToInvest, investmentCount, investmentAmount});
                await investor.save();
                 console.log("stored in investor")
            }
        }
    // profileData.user = user._id;
    // await profileData.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
