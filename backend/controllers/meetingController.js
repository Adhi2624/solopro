const { ObjectId } = require("mongodb");
const {getDB } = require('../config/db');
const meeting=require("../models/meeting")
const db=getDB();
const meetingconf=require('../mailtemplates/meetingconfirm')
const meetingrej = require('../mailtemplates/meetingconfirm')

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
        console.error("Error updating appointment status:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

const sendMail = async (_id) => {
    try {
        // Fetch meeting details
        const meetdetails = await db.collection('meetings').findOne({ _id: new ObjectId(_id) });
        console.log('Meeting Details:', meetdetails);  // Log meeting details

        if (!meetdetails) {
            throw new Error('Meeting not found');
        }

        // Function to find mentor's email
        const findMentor = async (mentorId) => {
            let mentor = await db.collection('investors').findOne({ _id: new ObjectId(mentorId) });
            if (mentor) {
                console.log('Mentor found in investors:', mentor.email);  // Log found mentor's email
                return mentor.email;
            }

            mentor = await db.collection('mentors').findOne({ _id: new ObjectId(mentorId) });
            if (mentor) {
                console.log('Mentor found in mentors:', mentor.email);  // Log found mentor's email
                return mentor.email;
            }

            mentor = await db.collection('entrepreneurs').findOne({ _id: new ObjectId(mentorId) });
            if (mentor) {
                console.log('Mentor found in entrepreneurs:', mentor.email);  // Log found mentor's email
                return mentor.email;
            }

            console.log('Mentor not found');
            return null;
        };

        let mentorEmail = await findMentor(meetdetails.mentorid);
        console.log('Mentor Email:', mentorEmail);  // Log mentor's email

        let studentDetails = await (await db).collection('students').findOne({ _id: new ObjectId(meetdetails.studentid) });
        console.log('Student Details:', studentDetails);  // Log student details

        if (!studentDetails) {
            console.log('Student not found');
            throw new Error('Student not found');
        }

        let studentEmail = studentDetails.email;
        console.log('Student Email:', studentEmail);  // Log student's email

        const { mentorname: mentorName, studentname: menteeName, title, startDate, startTime, endDate, endTime, meetingStatus, meetinglink } = meetdetails;
        console.log('Mentor Name:', mentorName);  // Log mentor name
        console.log('Mentee Name:', menteeName);  // Log mentee name
        console.log('Title:', title);  // Log title
        console.log('Start Date:', startDate);  // Log start date
        console.log('Start Time:', startTime);  // Log start time
        console.log('End Date:', endDate);  // Log end date
        console.log('End Time:', endTime);  // Log end time
        console.log('Meeting Status:', meetingStatus);  // Log meeting status
        console.log('Meeting Link:', meetinglink);  // Log meeting link

        if (!mentorName || !mentorEmail || !menteeName || !studentEmail || !meetingStatus || !meetinglink) {
            throw new Error('Incomplete meeting details');
        }

       // Send email based on meeting status
if (meetingStatus === 'Approved') {
    console.log('Preparing to send approval email');
    console.log('From:', 'soloprobusiness@gmail.com');
    console.log('To:', mentorEmail);
    console.log('Subject:', 'SOLOPRO');
    console.log('Mentor Name:', mentorName);
    console.log('Title:', title);
    console.log('Start Date:', startDate);
    console.log('Start Time:', startTime);
    console.log('End Date:', endDate);
    console.log('End Time:', endTime);
    console.log('Meeting Link:', meetinglink);
    console.log('Meeting Status:', meetingStatus);

    // Send email to mentor
    meetingconf(
        'soloprobusiness@gmail.com',
        mentorEmail,
        'SOLOPRO',
        mentorName,
        title,
        startDate,
        startTime,
        endDate,
        endTime,
        meetinglink,
        meetingStatus
    );

    // Optionally, add email sending logic for mentee if needed
    console.log('Preparing to send email to mentee');
    console.log('From:', 'soloprobusiness@gmail.com');
    console.log('To:', studentEmail);
    console.log('Subject:', 'SOLOPRO');
    console.log('Mentee Name:', menteeName);
    console.log('Title:', title);
    console.log('Start Date:', startDate);
    console.log('Start Time:', startTime);
    console.log('End Date:', endDate);
    console.log('End Time:', endTime);
    console.log('Meeting Link:', meetinglink);
    console.log('Meeting Status:', meetingStatus);

    // Add email sending logic for mentee if needed
} else if (meetingStatus === 'Rejected') {
    console.log('Preparing to send rejection email');
    console.log('From:', 'soloprobusiness@gmail.com');
    console.log('To:', studentEmail);
    console.log('Subject:', 'SOLOPRO');
    console.log('Mentee Name:', menteeName);
    console.log('Title:', title);
    console.log('Start Date:', startDate);
    console.log('Start Time:', startTime);
    console.log('End Date:', endDate);
    console.log('End Time:', endTime);
    console.log('Meeting Link:', meetinglink);
    console.log('Meeting Status:', meetingStatus);

    // Send email to student (rejection case)
    meetingrej(
        'soloprobusiness@gmail.com',
        studentEmail,
        'SOLOPRO',
        menteeName,
        title,
        startDate,
        startTime,
        endDate,
        endTime,
        meetinglink,
        meetingStatus
    );
}

    } catch (error) {
        console.log(1)
        console.error('Error handling meeting email:', error);
    }
};

