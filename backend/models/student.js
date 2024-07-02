const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  linkedin: { type: String },
  git: { type: String },
  collegeName: { type: String, required: true },
  course: { type: String, required: true },
  collegeLocation: { type: String, required: true },
  collegeIdPhoto: { type: String },
  profileImage: { type: String },
  institution: { type: String },
  nativePlaceOrWork: { type: String },
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
