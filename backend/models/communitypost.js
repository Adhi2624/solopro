const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    shortDesc: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    images: [String],
    videos: [String],
    role: { type: String },
    createdAt:{ type : Date, default: Date.now }
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;
