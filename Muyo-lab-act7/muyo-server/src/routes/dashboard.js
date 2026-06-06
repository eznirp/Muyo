import express from 'express';
import Article from '../models/Article.js';
import User from '../models/User.js';
import { verifyToken, verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats/overview', verifyAdminToken, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArticles = await Article.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const activeArticles = await Article.countDocuments({ status: 'Active' });

    const totalViews = await Article.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);

    res.json({
      totalUsers,
      totalArticles,
      activeUsers,
      activeArticles,
      totalViews: totalViews[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user statistics
router.get('/stats/users', verifyAdminToken, async (req, res) => {
  try {
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    const usersByStatus = await User.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const usersByGender = await User.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
    ]);

    res.json({
      byRole: usersByRole,
      byStatus: usersByStatus,
      byGender: usersByGender,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get article statistics
router.get('/stats/articles', verifyAdminToken, async (req, res) => {
  try {
    const articlesByStatus = await Article.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const topArticles = await Article.find()
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'firstName lastName');

    const recentArticles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'firstName lastName');

    res.json({
      byStatus: articlesByStatus,
      topArticles,
      recentArticles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reports
router.get('/reports/activity', verifyAdminToken, async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const newUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    const newArticles = await Article.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    const totalArticleViews = await Article.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } },
    ]);

    const userStatus = await User.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const articleStatus = await Article.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      return {
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
        label: date.toLocaleString('en-US', { month: 'short' }),
        start: date,
        end: nextDate,
      };
    });

    const monthlyActivity = await Promise.all(
      months.map(async (month) => {
        const [usersCreated, articlesCreated] = await Promise.all([
          User.countDocuments({
            createdAt: { $gte: month.start, $lt: month.end },
          }),
          Article.countDocuments({
            createdAt: { $gte: month.start, $lt: month.end },
          }),
        ]);

        return {
          month: month.label,
          usersCreated,
          articlesCreated,
          totalCreated: usersCreated + articlesCreated,
        };
      }),
    );

    res.json({
      newUsers,
      newArticles,
      totalArticleViews: totalArticleViews[0]?.total || 0,
      userStatus,
      articleStatus,
      monthlyActivity,
      lastUpdated: now,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
