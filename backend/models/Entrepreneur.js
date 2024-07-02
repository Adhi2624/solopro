const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  phone: { type: String, required: true },
  idProof: { type: String, required: true },
  profileImage: { type: String }
});

module.exports = mongoose.models.Entrepreneur || mongoose.model('Entrepreneur', userSchema);
