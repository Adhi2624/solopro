

const express = require('express');
const router = express.Router();
const multer = require('multer');
const FeaturedStory = require('../models/FeaturedStory');

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all featured stories
router.get('/', async (req, res) => {
  try {
    const stories = await FeaturedStory.find().sort({ order: 1 });
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single featured story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await FeaturedStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Story not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Add a new featured story
router.post('/', upload.single('image'), async (req, res) => {
  const { description, order, archived } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : '';

  try {
    const newStory = new FeaturedStory({
      image,
      description,
      order,
      archived,
    });

    const story = await newStory.save();
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a featured story
router.put('/:id', upload.single('image'), async (req, res) => {
  const { description, order, archived } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : '';

  try {
    const story = await FeaturedStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }

    story.description = description || story.description;
    story.image = image || story.image;
    story.order = order !== undefined ? order : story.order;
    story.archived = archived !== undefined ? archived : story.archived;

    await story.save();
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a featured story
router.delete('/:id', async (req, res) => {
  try {
    const story = await FeaturedStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }

    await story.remove();
    res.json({ msg: 'Story removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;