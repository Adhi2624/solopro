const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
  phone: { type: String, required: true },
  organizationName: { type: String, required: true },
  organizationType: { type: String, required: true }, // fintech, edtech, etc.
  organizationhead:{type:String,required:true},
  idProof: { type: String, required: true },
  profileImage: { type: String }
});

module.exports = mongoose.models.User || mongoose.model('Organization', userSchema);
