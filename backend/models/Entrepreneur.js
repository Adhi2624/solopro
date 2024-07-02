const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  phone: { type: String, required: true },
  idProof: { type: String, required: true },
  profileImage: { type: String }
});

module.exports = mongoose.models.User || mongoose.model('Entrepreneur', userSchema);
