const mongoose = require('mongoose');
const { Schema } = mongoose;

// Mentor Schema
const mentorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  linkedin: { type: String },
  areaOfExpertise: { type: String, required: true },
  experience: { type: String, required: true },
  profileImg: { type: String, required: true },
  institution: { type: String },
  nativePlaceOrWork: { type: String },
  proofImage: { type: String, required: true },
  availableToMentor: { type: Boolean, required: true },
  mentorshipCount: { type: Number, default: 0 },
});

const Mentor = mongoose.model('Mentor', mentorSchema);
module.exports = Mentor;
