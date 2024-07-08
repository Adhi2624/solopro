const { ObjectId } = require("mongodb");
const {getDB } = require('../config/db');
const meeting=require("../models/meeting")
const db=getDB();
const meetingconf=require('../mailtemplates/meetingconfirm')

exports.scheduleMeeting = async (req, res) => {
    try {
        
        const meetingData = req.body.meetingDetails;
        console.log(meetingData)
        if (!meetingData) {
            return res.status(400).json({ error: 'Invalid meeting data' });
        }
        //delete meetingData._id;
        // await meeting.insertOne(meetingData);
        await (await db).collection('meetings').insertOne(meetingData);
        meetingconf(req.body.email)
        res.status(201).json({ message: 'Meeting data inserted' });
    } catch (error) {
        console.error("Error scheduling meeting:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getMeetingByStudentId = async (req, res) => {
    try {
        const id = req.body._id;
        console.log(id);
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
       
        const id = req.body.id;
        console.log(id)
        const meetings = await (await db).collection('meetings').find({ mentorid: id }).toArray();
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
        const { appointmentId, meetingStatus } = req.body;
        
        const updatedAppointment =await (await db).collection('meetings').updateOne(
            { _id: new ObjectId(appointmentId) },
            { $set: { meetingStatus: meetingStatus } },
            { returnOriginal: false }
        );
        if (updatedAppointment.value) {
           // await sendMail(_id);
            res.json(updatedAppointment.value);
            
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }

    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).send("Internal Server Error");
    }
};

const sendMail = async (_id) => {
    try {
      const meetdetails = await (await db).collection('meetings').findOne({ _id: new ObjectId(_id) });
  
      if (!meetdetails) {
        throw new Error('Meeting not found');
      }
  
      const { mentorname: mentorName, studentname: menteeName, meetingStatus, meetinglink: meetingLink } = meetdetails;
  
      if (!mentorName || !menteeName || !meetingStatus || !meetingLink) {
        throw new Error('Incomplete meeting details');
      }
  
      if (meetingStatus === 'approved' || meetingStatus === 'rejected') {
        sendEmail(mentorName, menteeName, meetingLink,meetingStatus);
      }
    } catch (error) {
      console.error('Error handling meeting email:', error);
    }
  };