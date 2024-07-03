const { getDB } = require('../config/db');

exports.getAllData = async (req, res) => {
    try {
        const db = getDB(); // Get the database object

        // Fetch data from all collections
        const students = await db.collection("students").find().toArray();
        const organizations = await db.collection("organizations").find().toArray();
        const mentors = await db.collection("mentors").find().toArray();
        const investors = await db.collection("investors").find().toArray();
        const entrepreneurs = await db.collection("entrepreneurs").find().toArray();

        // Combine the results into a single array
        const combinedData = [
            ...students,
            ...organizations,
            ...mentors,
            ...investors,
            ...entrepreneurs,
        ];
        console.log(Object.keys(combinedData).length);
        res.send(combinedData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getDataByName = async (req, res) => {
    try {
        const db = getDB();
        const name = req.params.name;

        // Fetch data from all collections based on name
        const student = await db.collection("students").findOne({ name });
        const organization = await db.collection("organizations").findOne({ name });
        const mentor = await db.collection("mentors").findOne({ name });
        const investor = await db.collection("investors").findOne({ name });
        const entrepreneur = await db.collection("entrepreneurs").findOne({ name });

        // Combine the results into a single response
        const combinedData = {
            student,
            organization,
            mentor,
            investor,
            entrepreneur,
        };
        
        res.json(combinedData);
        console.log(combinedData);
    } catch (error) {
        console.error("Error fetching data by name:", error);
        res.status(500).send("Internal Server Error");
    }
};
