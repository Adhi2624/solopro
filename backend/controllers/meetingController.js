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
        //meetingconf(req.body.email);
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
        console.log(req.body)
        const updatedAppointment =await (await db).collection('meetings').updateOne(
            { _id: new ObjectId(appointmentId) },
            { $set: { meetingStatus: meetingStatus } },
            { returnOriginal: false }
        );
        await sendMail(appointmentId);
        console.log(updatedAppointment.value)
        if (updatedAppointment.value) {
           
            res.json(updatedAppointment.value);
            console.log(12)
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
        const meetdetails = await db.collection('meetings').findOne({ _id: new ObjectId(_id) });
        console.log(meetdetails)
        if (!meetdetails) {
            throw new Error('Meeting not found');
        }

        const findMentor = async (mentorId) => {
            let mentor = await db.collection('investors').findOne({ _id: new ObjectId(mentorId) });
            if (mentor) return mentor.email;

            mentor = await db.collection('mentors').findOne({ _id: new ObjectId(mentorId) });
            if (mentor) return mentor.email;

            mentor = await db.collection('entrepreneurs').findOne({ _id: new ObjectId(mentorId) });
            return mentor.email;
        };

        let mentorEmail = await findMentor(meetdetails.mentorid);
        console.log(mentorEmail)
        console.log(meetdetails.studentid)
        let studentDetails = await db.collection('Users').findOne({ _id: new ObjectId(meetdetails.studentId) });
        let studentEmail = studentDetails;
        console.log(studentEmail)
        const { mentorname: mentorName, studentname: menteeName, title, startDate, startTime, endDate, endTime, meetingStatus, meetingLink } = meetdetails;

        if (!mentorName || !mentorEmail || !menteeName || !studentEmail || !meetingStatus || !meetingLink) {
            throw new Error('Incomplete meeting details');
        }

        if (meetingStatus === 'Approved' || meetingStatus === 'Rejected') {
            // Send email to mentor
            meetingconf('adhithiyan.21it@sonatech.ac.in', mentorEmail, 'SOLOPRO', mentorName, title, startDate, startTime, endDate, endTime, meetingLink, meetingStatus);
            // Send email to mentee
            meetingconf('adhithiyan.21it@sonatech.ac.in', studentEmail, 'SOLOPRO', menteeName, title, startDate, startTime, endDate, endTime, meetingLink, meetingStatus);
        }
    } catch (error) {
        console.error('Error handling meeting email:', error.message);
    }
};
