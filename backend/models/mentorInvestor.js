const mongoose = require('mongoose');
const { Schema } = mongoose;

// Mentor and Investor Schema
const mentorInvestorSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: String, required: true },
    linkedin: { type: String },
    areaOfExpertise: { type: String, required: true },
    experience: { type: String, required: true },
    idProof: { type: String, required: true },
    availableToMentorOrInvest: { type: Boolean, required: true },
    profileImg: { type: String, required: true },
    mentorshipCount: { type: Number, default: 0 },
    investmentCount: { type: Number, default: 0 },
    investmentAmount: { type: Number, default: 0 }
});

const MentorInvestor = mongoose.model('MentorInvestor', mentorInvestorSchema);
module.exports = MentorInvestor;
