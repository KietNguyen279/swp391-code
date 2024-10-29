const express = require('express');
const router = express.Router();
const NewsBlog = require('../models/newsBlog');
const { verifyTokens, verifyShopRole } = require('../middleware/authMiddleware');

// Get all news blogs
router.get('/', (req, res) => {
  NewsBlog.getAllNewsBlogs((error, newsBlogs) => {
    if (error) {
      console.error('Error fetching news blogs:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.json(newsBlogs);
  });
});

// Get news blog by ID
router.get('/:id', (req, res) => {
  const newsBlogId = req.params.id;
  // Input validation
  if (isNaN(newsBlogId) || newsBlogId <= 0) {
    return res.status(400).json({ message: 'Invalid news blog ID' });
  }
  NewsBlog.getNewsBlogById(newsBlogId, (error, newsBlog) => {
    if (error) {
      console.error('Error fetching news blog:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    if (!newsBlog) {
      return res.status(404).json({ message: 'News blog not found' });
    }
    res.json(newsBlog);
  });
});

// Create news blog
router.post('/', verifyTokens, verifyShopRole, (req, res) => {
  const { image, title, content, date_published } = req.body;

  // Input validation
  if (!image || !title || !content || !date_published) {
    return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
  }
  // Additional validation for each field
  if (typeof image !== 'string' || image.length === 0) {
    return res.status(400).json({ message: 'Invalid image URL' });
  }
  if (typeof title !== 'string' || title.length === 0) {
    return res.status(400).json({ message: 'Invalid title' });
  }
  if (typeof content !== 'string' || content.length === 0) {
    return res.status(400).json({ message: 'Invalid content' });
  }
  if (typeof date_published !== 'string' || date_published.length === 0) {
    return res.status(400).json({ message: 'Invalid date published' });
  }
  if (isNaN(Date.parse(date_published))) {
    return res.status(400).json({ message: 'Invalid date published' }); 
  }
  if (new Date(date_published) > new Date()) {
    return res.status(400).json({ message: 'Date published cannot be in the future' });
  }

  NewsBlog.createNewsBlog(image, title, content, date_published, (error, result) => {
    if (error) {
      console.error('Error creating news blog:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.status(201).json({ message: 'News blog created successfully' });
  });
});

// Update news blog by ID
router.put('/:id', verifyTokens, verifyShopRole, (req, res) => {
  const newsBlogId = req.params.id;
  const { image, title, content, date_published } = req.body;

  // Input validation
  if (isNaN(newsBlogId) || newsBlogId <= 0) {
    return res.status(400).json({ message: 'Invalid news blog ID' });
  }
  if (!image && !title && !content && !date_published) {
    return res.status(400).json({ message: 'No fields to update.' });
  }
  if (image && (typeof image !== 'string' || image.length === 0)) {
    return res.status(400).json({ message: 'Invalid image URL' });
  }
  if (title && (typeof title !== 'string' || title.length === 0)) {
    return res.status(400).json({ message: 'Invalid title' });
  }
  if (content && (typeof content !== 'string' || content.length === 0)) {
    return res.status(400).json({ message: 'Invalid content' });
  }
  if (date_published && (typeof date_published !== 'string' || date_published.length === 0)) {
    return res.status(400).json({ message: 'Invalid date published' });
  }
  if (date_published && isNaN(Date.parse(date_published))) {
    return res.status(400).json({ message: 'Invalid date published' }); 
  }

  NewsBlog.updateNewsBlogById(newsBlogId, image, title, content, date_published, (error, result) => {
    if (error) {
      console.error('Error updating news blog:', error);
      if (error.message === 'No fields to update.') {
        return res.status(400).json({ message: error.message });
      } else if (error.message.startsWith('Invalid input data')) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ error: error.toString() });
      }
    }
    if (result === 1) {
      res.json({ message: 'News blog updated successfully' });
    } else {
      res.status(404).json({ message: 'News blog not found' });
    }
  });
});

// Delete news blog by ID
router.delete('/:id', verifyTokens, verifyShopRole, (req, res) => {
  const newsBlogId = req.params.id;
  // Input validation
  if (isNaN(newsBlogId) || newsBlogId <= 0) {
    return res.status(400).json({ message: 'Invalid news blog ID' });
  }

  NewsBlog.deleteNewsBlogById(newsBlogId, (error, result) => {
    if (error) {
      console.error('Error deleting news blog:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    if (result === 1) {
      res.json({ message: 'News blog deleted successfully' });
    } else {
      res.status(404).json({ message: 'News blog not found' });
    }
  });
});

module.exports = router;