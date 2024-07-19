const sharp = require('sharp');
const Post = require('../models/communitypost');
const objectId=require('mongodb').ObjectId
const {getDB}=require('../config/db')
exports.createPost = async (req, res) => {
    const { title, content, shortDesc } = req.body;
    
    const images = await Promise.all(
        (req.files.images || []).map(async (file) => {
            const buffer = await sharp(file.buffer).resize(500).toBuffer();
            return buffer.toString('base64');
        })
    );

    const videos = (req.files.videos || []).map((file) => file.buffer.toString('base64'));
    console.log(req.body);
    try {
        console.log(1);
        const post = new Post({ title, content, shortDesc, images, videos, author: new objectId(req.body.uid),role:req.body.role });
        console.log(2);
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create post. Please try again.' });
    console.log(error.message)
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        if (post.author.toString() !== req.userId) {
            return res.status(403).send({ error: 'Forbidden' });
        }
        Object.assign(post, req.body);
        await post.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update post. Please try again.' });
    }
};

exports.getPost = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const post = await Post.findById(id);
        // if (!post) {
        //     return res.status(404).send({ error: 'Post not found' });
        // }
        // if (post.author.toString() !== req.userId) {
        //     return res.status(403).send({ error: 'Forbidden' });
        // }
        
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update post. Please try again.' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        // Fetch raw posts from the database
        const rawPosts = await Post.find();
        console.log('Raw Posts:', JSON.stringify(rawPosts, null, 2));
        
        // Send the populated posts as a JSON response
        res.status(200).json(rawPosts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to retrieve posts. Please try again.' });
    }
};


exports.likePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.headers['user-id']; // Assuming the user ID is passed in the headers
    console.log(id,userId)
    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likedBy.includes(userId)) {

            post.likedBy.pop(userId);
            post.likes -= 1;
          //  return res.status(400).send({ error: 'User has already liked this post' });
        }
        else{
        // Add the user's ID to the likedBy array and increment the like count
        post.likedBy.push(userId);
        post.likes += 1;
        }
        await post.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to like post. Please try again.' });
    }
};


exports.addComment = async (req, res) => {
    const { id } = req.params;
    //const { content } = req.body.text;
    console.log(req.body.text);
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        post.comments.push({ content:req.body.text, author: req.body.id });
        
        await post.save();
        console.log(234)
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to add comment. Please try again.' });
        console.log(error.message);
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        if (post.author.toString() !== req.userId) {
            return res.status(403).send({ error: 'Forbidden' });
        }
        await post.delete();
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete post. Please try again.' });
    }
};
