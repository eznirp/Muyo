import express from 'express';
import User from '../models/User.js';
import Article from '../models/Article.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Get all users (for debugging)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all articles (for debugging)
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'firstName lastName email');
    res.json({
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear all data (for testing - remove in production!)
router.delete('/clear', verifyAdminToken, async (req, res) => {
  try {
    await User.deleteMany({});
    await Article.deleteMany({});
    res.json({ message: 'All data cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
