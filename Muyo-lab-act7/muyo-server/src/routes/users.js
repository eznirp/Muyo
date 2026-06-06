import express from 'express';
import User from '../models/User.js';
import { verifyToken, verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// Get all users (Admin only)
router.get('/', verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create user (Admin only)
router.post('/', verifyAdminToken, async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, contact, age, gender, role, status } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      contact,
      age,
      gender: gender || 'Female',
      role: role || 'Viewer',
      status: status || 'Active',
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Users can only update their own profile unless they're admin
    if (req.user.userId !== req.params.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    const { firstName, lastName, contact, age, gender, status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        contact,
        age,
        gender,
        status,
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user (Admin only)
router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
