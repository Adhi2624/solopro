const mongoose = require('mongoose');
const { Schema } = mongoose;

// Investor Schema
const investorSchema = new Schema({
  // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  linkedin: { type: String },
  areaOfExpertise: { type: String, required: true },
  experience: { type: String, required: true },
  profileImage: { type: String},
  institution: { type: String },
  nativePlaceOrWork: { type: String },
  proofImage: { type: String },
  availableToInvest: { type: Boolean, required: true },
  investmentCount: { type: Number, default: 0 },
  investmentAmount: { type: Number, default: 0 },
});

const Investor = mongoose.model('Investor', investorSchema);
module.exports = Investor;
