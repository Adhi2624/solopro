const { getDB } = require('../config/db');

exports.getTotalCount = async (req, res) => {
    try {
        const db = await getDB();

        // Get the count of students
        const studentCount = await db.collection('students').countDocuments();

        // Get the count of mentors
        const mentorCount = await db.collection('mentors').countDocuments();
        const EntrepreneurCount = await db.collection('Entrepreneur').countDocuments();

        // Get the count of investors
        const investorCount = await db.collection('investors').countDocuments();

        res.json({
            studentCount,
            mentorCount,
            investorCount,
            EntrepreneurCount,
        });
    } catch (error) {
        console.error("Error fetching counts:", error);
        res.status(500).send("Internal Server Error");
    }
};
