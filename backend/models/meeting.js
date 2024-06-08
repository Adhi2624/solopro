const mongoose = require('mongoose');
const { Schema } = mongoose;

// Meeting Schema
const meetingSchema = new Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endDate: { type: Date, required: true },
    endTime: { type: String, required: true },
    meetingLink: { type: String, default: '' },
    meetingStatus: { type: String, enum: ['Approved', 'Waiting', 'Rejected'], default: 'Waiting' },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true }
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
