const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// Redirect to original URL
router.get('/:shortId', async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });

    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
