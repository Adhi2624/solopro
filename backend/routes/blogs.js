const express = require('express');
const router = express.Router();
const multer = require('multer');
const AdminBlog = require('../models/Blog');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const blogs = await AdminBlog.find().sort({ order: 1 });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await AdminBlog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, order, archived } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : '';

  try {
    const newBlog = new AdminBlog({
      title,
      image,
      description,
      order,
      archived,
    });

    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, description, order, archived } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : '';

  try {
    const blog = await AdminBlog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.image = image || blog.image;
    blog.order = order !== undefined ? order : blog.order;
    blog.archived = archived !== undefined ? archived : blog.archived;

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blog = await AdminBlog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    await blog.remove();
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
