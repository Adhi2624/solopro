// adminModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminschema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
});

module.exports = mongoose.models.admin || mongoose.model('admin', adminschema);
