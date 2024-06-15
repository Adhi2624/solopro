const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const { connectDB } = require('../config/db'); // Import connectDB function

const upload = multer();

router.post('/', upload.none(), async (req, res) => {
    const { email, password, userType, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const db = await connectDB(); // Get the MongoDB database instance

        // Save the user to the 'users' collection
        await db.collection('users').insertOne({
            email: req.body.email,
            password: hashedPassword,
            role: req.body.userType
            // Add other fields as needed
        });

        let profileData;

        const { phone, linkedin, profileImage, institution, nativePlaceOrWork } = userData;

        if (userType === 'Student') {
            const { git, collegeName, course, collegeLocation, collegeIdPhoto } = userData;
            profileData = {
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
            // Save student profile data to the 'students' collection
            await db.collection('students').insertOne(profileData);
        } else if (userType === 'Mentor') {
            const { areaOfExpertise, experience, proofImage, availableToMentor, mentorshipCount } = userData;
            profileData = {
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
            // Save mentor profile data to the 'mentors' collection
            await db.collection('mentors').insertOne(profileData);
        } else if (userType === 'Investor') {
            const { areaOfExpertise, experience, proofImage, availableToInvest, investmentCount, investmentAmount } = userData;
            profileData = {
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
            // Save investor profile data to the 'investors' collection
            await db.collection('investors').insertOne(profileData);
        }

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
