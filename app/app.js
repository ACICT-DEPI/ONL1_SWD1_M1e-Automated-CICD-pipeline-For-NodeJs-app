// app.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Service is up and running!' });
});

// Example API Route
app.get('/', (req, res) => {
  res.send('Welcome to the DevOps Project!');
});

// Post Route Example
app.post('/data', (req, res) => {
  const data = req.body;
  console.log('Received Data:', data);
  res.status(201).json({ message: 'Data received successfully!', data });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
