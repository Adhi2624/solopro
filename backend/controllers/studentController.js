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

exports.getprofileimg=async(req,res)=>
{
    const id=req.body.id;
    try{
    const db=connectDB();
    const profile= await (await db).collection('students').findOne({_id : new ObjectId(id)});
    if (profile && profile.profileImage){
        res.json({ profileImage: profile.profileImage, name: profile.name });
    }
    else{res.status(404).json({ error: 'profile not found' });}
    }
    catch (error){
        console.error("Error fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
    
};

exports.updateStudent = async (req, res) => {
    const id = req.body._id;
    const data = req.body;
    console.log(id);
    const { _id, ...dataup } = data;
    try {
        const db = await connectDB();
        await db.collection('students').updateOne(
            { _id: new ObjectId(id) }, // Filter to select the document by ID
            { $set: dataup } // Update operation
        );

        res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
    }
};