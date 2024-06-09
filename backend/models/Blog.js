


const mongoose = require('mongoose');

const AdminBlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    default: 0,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('AdminBlog', AdminBlogSchema);