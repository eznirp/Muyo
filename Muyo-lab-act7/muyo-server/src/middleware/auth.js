import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.userId).select('role status');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({ message: 'User account is inactive' });
    }

    req.user = {
      userId: decoded.userId,
      role: user.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const generateToken = (user) => {
  const userId = typeof user === 'object' && user !== null ? user._id || user : user;
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: '7d' });
};

export const verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.userId).select('role status');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({ message: 'User account is inactive' });
    }

    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = {
      userId: decoded.userId,
      role: user.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
