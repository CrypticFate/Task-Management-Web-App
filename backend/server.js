const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple test endpoint that doesn't require authentication
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Test endpoint for tasks that doesn't require authentication
app.get('/api/test-tasks', (req, res) => {
  res.json([
    { _id: 'test1', title: 'Test Task 1', description: 'This is a test task', priority: 'medium' },
    { _id: 'test2', title: 'Test Task 2', description: 'This is another test task', priority: 'high' }
  ]);
});

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
