const sharp = require('sharp');
const Post = require('../models/communitypost');

exports.createPost = async (req, res) => {
    const { title, content, shortDesc } = req.body;
    const head=req.headers;
    console.log(head);
    const images = await Promise.all(
        (req.files.images || []).map(async (file) => {
            const buffer = await sharp(file.buffer).resize(500).toBuffer();
            return buffer.toString('base64');
        })
    );

    const videos = (req.files.videos || []).map((file) => file.buffer.toString('base64'));

    try {
        const post = new Post({ title, content, shortDesc, images, videos, author: head.id,role:head.role });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create post. Please try again.' });
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

exports.getPosts = async (req, res) => {
    const { search, filter } = req.query;
    let query = {};

    if (search && filter) {
        query[filter] = { $regex: search, $options: 'i' }; // Case insensitive search
    }

    try {
        const posts = await Post.find(query).populate('author', 'name role photo');
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve posts. Please try again.' });
    }
};

exports.likePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        post.likes += 1;
        await post.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to like post. Please try again.' });
    }
};

exports.addComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        post.comments.push({ content, author: req.userId });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ error: 'Failed to add comment. Please try again.' });
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
