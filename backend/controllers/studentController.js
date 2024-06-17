const { ObjectId } = require("mongodb");
const { connectDB } = require('../config/db');
const student=require('../models/student');

exports.getStudentById = async (req, res) => {
    const id = req.body._id;
    try {
        const db = connectDB(); // Get the database object
        const user = await (await db).collection('students').findOne({ _id: new ObjectId(id) });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
};
