const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const shortid = require('shortid');
const { protect } = require('../middleware/authMiddleware');

// Get all URLs for a user
router.get('/', protect, async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create short URL
router.post('/', protect, async (req, res) => {
  const { originalUrl, customAlias } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: 'Original URL is required' });
  }

  try {
    let shortId = shortid.generate();
    
    // Check if custom alias is provided and available
    if (customAlias) {
      const existingAlias = await Url.findOne({ customAlias });
      if (existingAlias) {
        return res.status(400).json({ message: 'Custom alias is already in use' });
      }
      shortId = customAlias;
    }

    const url = await Url.create({
      originalUrl,
      shortId,
      customAlias: customAlias || undefined,
      user: req.user._id
    });

    res.status(201).json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a URL
router.delete('/:id', protect, async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Check if user owns the URL
    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await url.deleteOne();
    res.json({ message: 'URL removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
