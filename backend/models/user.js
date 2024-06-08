const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'mentor', 'investor'], required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: 'User' },
    studentId: { type: Schema.Types.ObjectId, ref: 'User' },
    jwtToken: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
