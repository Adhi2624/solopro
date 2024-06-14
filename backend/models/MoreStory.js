

const mongoose = require('mongoose');

const MoreStorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
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

module.exports = mongoose.model('MoreStory', MoreStorySchema);