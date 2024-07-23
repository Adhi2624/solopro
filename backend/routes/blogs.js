const express = require('express');
const router = express.Router();
const multer = require('multer');
const AdminBlog = require('../models/Blog');
const objectId = require('mongodb').ObjectId
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');
const Investor = require('../models/Investor');
const Entrepreneur = require('../models/Entrepreneur');
const { getDB } = require('../config/db');
const roleModels = {
  Student: Student,
  Mentor: Mentor,
  Entrepreneur: Entrepreneur,
  Investor: Investor,
};



router.get('/', async (req, res) => {
  const { uid } = req.query;
  try {

    if (uid) {
      const blogs = await AdminBlog.find({ userid: new objectId(uid) }).sort({ order: 1 });
      res.json(blogs);
    }
    else {
      const blogs = await AdminBlog.find().sort({ order: 1 });
      res.json(blogs);
    }

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
  const { title, description, order, archived, userid, role } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : '';
  // console.log(req.body)
  const db = getDB();
  const RoleModel = roleModels[role];
  try {
    const userProfile = await db.collection(RoleModel.collection.name).findOne({ _id: new objectId(userid) });

    const newBlog = new AdminBlog({
      title,
      image,
      description,
      order,
      archived
      ,
      userid: new objectId(userid), role,
      username: userProfile.name
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
    const blog = await AdminBlog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
