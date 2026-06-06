import express from 'express';
import Article from '../models/Article.js';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all articles (public)
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({ status: 'Active' })
      .populate('author', 'firstName lastName username')
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all articles (dashboard - admin sees all)
router.get('/dashboard/all', verifyToken, async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'firstName lastName username')
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get article by name/slug
router.get('/name/:name', async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { name: req.params.name },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'firstName lastName username');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'firstName lastName username');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, title, content, image, status } = req.body;

    if (!name || !title || !content) {
      return res.status(400).json({ message: 'Name, title, and content are required' });
    }

    // Check if article with same name already exists
    const existingArticle = await Article.findOne({ name });
    if (existingArticle) {
      return res.status(400).json({ message: 'Article with this name already exists' });
    }

    const article = new Article({
      name,
      title,
      content: Array.isArray(content) ? content : [content],
      image,
      status: status || 'Active',
      author: req.user.userId,
    });

    await article.save();
    await article.populate('author', 'firstName lastName username');

    res.status(201).json({
      message: 'Article created successfully',
      article,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update article
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, title, content, image, status } = req.body;

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check authorization (author or admin)
    const user = await User.findById(req.user.userId);
    if (article.author.toString() !== req.user.userId && user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to update this article' });
    }

    // Check if new name already exists
    if (name && name !== article.name) {
      const existingArticle = await Article.findOne({ name });
      if (existingArticle) {
        return res.status(400).json({ message: 'Article with this name already exists' });
      }
    }

    article.name = name || article.name;
    article.title = title || article.title;
    if (content !== undefined) {
      article.content = Array.isArray(content) ? content : [content];
    }
    if (image !== undefined) {
      article.image = image;
    }
    article.status = status || article.status;

    await article.save();
    await article.populate('author', 'firstName lastName username');

    res.json({
      message: 'Article updated successfully',
      article,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete article
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check authorization (author or admin)
    const user = await User.findById(req.user.userId);
    if (article.author.toString() !== req.user.userId && user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
