import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import articleRoutes from './routes/articles.js';
import dashboardRoutes from './routes/dashboard.js';
import debugRoutes from './routes/debug.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Use Google DNS to bypass local DNS/ISP blocking issues.
dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('Environment check:');
console.log('- MONGODB_URI configured:', Boolean(MONGODB_URI));
console.log('- Node version:', process.version);
console.log('- Using DNS: 8.8.8.8, 8.8.4.4');

// Manual CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'false');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// CORS configuration
const corsOptions = {
  origin: '*',
  credentials: false,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

const connectMongoDB = async () => {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing from .env');
    process.exit(1);
  }

  let retries = 3;

  while (retries > 0) {
    try {
      await mongoose.connect(MONGODB_URI, {
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });

      console.log('Connected to MongoDB Atlas');
      return;
    } catch (error) {
      retries -= 1;
      console.error(`MongoDB connection attempt failed: ${error.message}`);

      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.error('Failed to connect after 3 attempts');
        process.exit(1);
      }
    }
  }
};

app.get('/', (req, res) => {
  res.json({ message: 'Muyo server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/debug', debugRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = (port = PORT) => {
  if (port > 65535) {
    console.error('No available ports found. Exiting.');
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', error => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  });
};

// For Vercel, we export the app
// In production, Vercel handles the HTTP server
// In development, we run the server locally
if (process.env.NODE_ENV !== 'production') {
  await connectMongoDB();
  startServer();
}

export default app;
