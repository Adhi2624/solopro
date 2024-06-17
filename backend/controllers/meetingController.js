const { ObjectId } = require("mongodb");
const { connectDB } = require('../config/db');
const meeting=require("../models/meeting")
const db=connectDB();
exports.scheduleMeeting = async (req, res) => {
    try {
        
        const meetingData = req.body;
        console.log(meetingData)
        if (!meetingData) {
            return res.status(400).json({ error: 'Invalid meeting data' });
        }
        //delete meetingData._id;
        // await meeting.insertOne(meetingData);
        await (await db).collection('meetings').insertOne(meetingData);
        res.status(201).json({ message: 'Meeting data inserted' });
    } catch (error) {
        console.error("Error scheduling meeting:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getMeetingByStudentId = async (req, res) => {
    try {
        const id = req.body._id;
        console.log(id)
        const meeting = await  (await db).collection('meetings').find({ 'studentid': id }).toArray();
        if (meeting) {
            res.json(meeting);
        } else {
            res.status(404).json({ error: 'Meeting not found' });
        }
    } catch (error) {
        console.error("Error fetching meeting:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAppointmentsByMentorId = async (req, res) => {
    try {
       // const db = getDB();
        const id = req.body.id;
        const meetings = await meeting.find({ mentorid: id }).toArray();
        if (meetings.length > 0) {
            res.json(meetings);
        } else {
            res.status(404).json({ error: 'No appointments found for the mentor' });
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
     //   const db = getDB();
        const { appointmentId, newStatus } = req.body;
        const updatedAppointment = await meeting.findOneAndUpdate(
            { _id: new ObjectId(appointmentId) },
            { $set: { meetingStatus: newStatus } },
            { returnOriginal: false }
        );
        if (updatedAppointment.value) {
            res.json(updatedAppointment.value);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).send("Internal Server Error");
    }
};
