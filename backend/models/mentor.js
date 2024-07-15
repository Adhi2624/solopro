// mentorModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const mentorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  linkedin: { type: String },
  areaOfExpertise: { type: String, required: true },
  experience: { type: String, required: true },
  profileImage: { type: String },
  institution: { type: String },
  nativePlaceOrWork: { type: String },
  proofImage: { type: String },
  availableToMentor: { type: Boolean, required: true },
  mentorshipCount: { type: Number, default: 0 }
});

module.exports = mongoose.models.Mentor || mongoose.model('Mentor', mentorSchema);
