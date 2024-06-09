

const mongoose = require('mongoose');

const FeaturedStorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
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

module.exports = mongoose.model('FeaturedStory', FeaturedStorySchema);
