import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, contact, age, gender, role, status } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedUsername = username?.trim();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email or username' });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      contact,
      age,
      gender: gender || 'Female',
      role: role === 'Viewer' ? 'Viewer' : 'Editor',
      status: status || 'Active',
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
