
const express = require('express');
const router = express.Router();
const multer = require('multer');
const MoreStory = require('../models/MoreStory');

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all more stories
router.get('/', async (req, res) => {
  try {
    const stories = await MoreStory.find().sort({ order: 1 });
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single more story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await MoreStory.findById(req.params.id);
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

// Add a new more story
router.post('/', upload.single('image'), async (req, res) => {
  const { shortDescription, order, archived } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : '';

  try {
    const newStory = new MoreStory({
      image,
      shortDescription,
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

// Update a more story
router.put('/:id', upload.single('image'), async (req, res) => {
  const { shortDescription, order, archived } = req.body;
  const image = req.file ? req.file.buffer.toString('base64') : '';

  try {
    const story = await MoreStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }

    story.shortDescription = shortDescription || story.shortDescription;
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

// Delete a more story
router.delete('/:id', async (req, res) => {
  try {
    const story = await MoreStory.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }
    res.json({ msg: 'Story removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;