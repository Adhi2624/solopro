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

exports.getprofileimg=async(req,res)=>
    {
        const id=req.body.id;
        console
        try{
        const db=getDB();
        const profile= await (await db).collection('investors').findOne({_id : new ObjectId(id)});
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

    exports.updateInvestor = async (req, res) => {
        const id = req.body._id;
        const data = req.body;
        console.log(id);
        const { _id, ...dataup } = data;
        try {
            const db = await getDB();
            await db.collection('investors').updateOne(
                { _id: new ObjectId(id) }, // Filter to select the document by ID
                { $set: dataup } // Update operation
            );
    
            res.status(200).json({ message: 'Profile updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
        }
    };