const { ObjectId } = require("mongodb");
const { getDB } = require('../config/db');

exports.getStudentById = async (req, res) => {
    const id = req.body._id;
    try {
        const db = getDB(); // Get the database object
        const user = await db.collection("student").findOne({ _id: new ObjectId(id) });
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
