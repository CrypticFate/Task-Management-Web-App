const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
// ...existing code...

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// ...existing code...
mongoose.connect('your_mongo_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server running on port 3000')))
  .catch(err => console.error(err));
