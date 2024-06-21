const { ObjectId } = require("mongodb");
const { getDB } = require('../config/db');


exports.getAllInvestors = async (req, res) => {
    console.log("cn")
    try {
        const db = getDB(); // Get the database object
        const mentors = await db.collection("investors").find().toArray();
        res.send(mentors);
    } catch (error) {
        console.error("Error fetching mentors:", error);
        res.status(500).send("Internal Server Error");
    }
};
;

exports.getInvestorById = async (req, res) => {
    try {
        console.log(123);
        const db = getDB();
        const id = req.body._id;
        console.log(req.body);
        const user = await db.collection("investors").findOne({ _id: new ObjectId(id) });
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