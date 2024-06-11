const mongoose = require('mongoose');
const { Schema } = mongoose;

// Student Schema
const studentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    linkedin: { type: String },
    git: { type: String },
    collegeName: { type: String, required: true },
    course: { type: String, required: true },
    collegeLocation: { type: String, required: true },
    collegeIdPhoto: { type: String, required: true },
    profileImg: { type: String, required: true },
    institution: { type: String },
    nativePlaceOrWork: { type: String },
    password: { type: String, required: true }, 
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
