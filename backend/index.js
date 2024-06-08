const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://localhost:27017";
const dbName = "solopro";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log("MongoDB connected successfully"); // Log success message
        const db = client.db(dbName);
        const coll = db.collection("mentor");

        app.get("/getmentors", (req, res) => {
            coll.find().toArray()
                .then(mentors => {
                    res.send(mentors);
                })
                .catch(error => {
                    console.error("Error fetching mentors:", error);
                    res.status(500).send("Internal Server Error");
                });
        });

        app.post("/getmentor", (req, res) => {
            const id = req.body._id;
            console.log(id);
            
            // Find the user by _id in the collection
            coll.findOne({ _id: new ObjectId(id) }) // Use ObjectId to convert _id string
                .then(user => {
                    if (user) {
                        // User found, send it in the response
                        res.json(user);
                    } else {
                        // User not found
                        res.status(404).json({ error: 'User not found' });
                    }
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                    res.status(500).send("Internal Server Error");
                });
        });
        app.post("/getstudent",(req,res)=>{
            
            let id=req.body._id;
            
            db.collection("student").findOne({_id:new ObjectId(id)}).then(user => {
                if (user) {
                    // User found, send it in the response
                    res.json(user);
                } else {
                    // User not found
                    res.status(404).json({ error: 'User not found' });
                }
            })
            .catch(error => {
                console.error("Error fetching user:", error);
                res.status(500).send("Internal Server Error");
            })})

            app.post("/schedulemeeting", (req, res) => {
                const meetingData = req.body;
            
                // Check if the meetingData object is properly defined
                if (!meetingData) {
                    return res.status(400).json({ error: 'Invalid meeting data' });
                }
            
                // Remove _id property from meetingData object
                delete meetingData._id;
            
                db.collection("meetings").insertOne(meetingData)
                    .then(result => {
                            res.status(201).json({ message: 'Meeting data inserted  ' });
                        
                    })
                    .catch(error => {
                        console.error("Error scheduling meeting:", error);
                        res.status(500).send("Internal Server Error");
                    });
            });
            
            

                app.post("/getmeetingstu",(req,res)=>{
                    
                    let id=req.body.id;
                    
                    db.collection("meetings").findOne({'studentid':id}).then(user => {
                        if (user) {
                            // User found, send it in the response
                            res.json(user);
                        } else {
                            // User not found
                            res.status(404).json({ error: 'User not found' });
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching user:", error);
                        res.status(500).send("Internal Server Error");
                    })})

                    app.post("/getappointments",(req,res)=>{
                    
                        let id=req.body.id;
                        

                        db.collection('meetings').find({ mentorid: id }).toArray().then(user => {
                            if (user) {
                                // User found, send it in the response
                                res.json(user);
                            } else {
                                // User not found
                                res.status(404).json({ error: 'User not found' });
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching user:", error);
                            res.status(500).send("Internal Server Error");
                        })})

                        app.post("/updatestatus", async (req, res) => {
                            const { appointmentId, newStatus } = req.body;
                            console.log(req.body)
                            try {
                                const updatedAppointment = await db.collection('meetings').findOneAndUpdate(
                                    { _id: new ObjectId(appointmentId) },
                                    { $set: { meetingStatus: newStatus } },
                                    { returnOriginal: false } // To return the updated document
                                );
                        
                                if (updatedAppointment.value) {
                                    // Appointment updated successfully
                                    res.json(updatedAppointment.value);
                                } else {
                                    // Appointment not found
                                    res.status(404).json({ error: 'Appointment not found' });
                                }
                            } catch (error) {
                                console.error("Error updating appointment status:", error);
                                res.status(500).send("Internal Server Error");
                            }
                        });
        // Close MongoDB connection when the server stops
        process.on('SIGINT', () => {
            client.close();
            console.log("MongoDB connection closed");
            process.exit(0);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Stop the server if there's an error connecting to MongoDB
    });

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
