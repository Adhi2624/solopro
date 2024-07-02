const { ObjectId } = require("mongodb");
const { getDB } = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const db = getDB(); // Get the database object
        const users = await db.collection("users").find().toArray();
        res.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const db = getDB();
        const id = req.body._id;
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
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

// Get user profile image
exports.getProfileImage = async (req, res) => {
    const id = req.body.id;
    try {
        const db = getDB();
        const profile = await db.collection('users').findOne({ _id: new ObjectId(id) });
        if (profile && profile.profileImage) {
            res.json({ profileImage: profile.profileImage, name: profile.name });
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const id = req.body._id;
    const data = req.body;
    const { _id, ...dataToUpdate } = data;
    try {
        const db = await getDB();
        await db.collection('users').updateOne(
            { _id: new ObjectId(id) }, // Filter to select the document by ID
            { $set: dataToUpdate } // Update operation
        );

        res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
    }
};
