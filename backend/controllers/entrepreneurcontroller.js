const { ObjectId } = require("mongodb");
const { getDB } = require('../config/db');


exports.getAllEntrepreneur = async (req, res) => {
    
    try {
        const db = getDB(); // Get the database object
        
        const Entrepreneur = await db.collection("entrepreneurs").find().toArray();
        res.send(Entrepreneur);
        
    } catch (error) {
        console.error("Error fetching Entrepreneur:", error);
        res.status(500).send("Internal Server Error");
    }
};
;

exports.getentrepreneurById = async (req, res) => {
    
    try {
        const db = getDB();
        const id = req.body._id;
        const user = await db.collection("entrepreneurs").findOne({ _id: new ObjectId(id) });
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
        const db=getDB();
        const profile= await (await db).collection('entrepreneurs').findOne({_id : new ObjectId(id)});
       // console.log(profile);
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

    exports.updateentrepreneur = async (req, res) => {
        const id = req.body._id;
        const data = req.body;
        console.log(id);
        const { _id, ...dataup } = data;
        try {
            const db = await getDB();
            await db.collection('entrepreneurs').updateOne(
                { _id: new ObjectId(id) }, // Filter to select the document by ID
                { $set: dataup } // Update operation
            );
    
            res.status(200).json({ message: 'Profile updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
        }
    };