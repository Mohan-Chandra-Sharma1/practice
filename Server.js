// const express = require('express');
import express from 'express';
import cors from 'cors';
// const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 4000; // You can change the port to your preferred one

// Use the cors middleware to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Add your frontend's URL
}));

// Define a simple GET API endpoint
app.get('/api/data', (req, res) => {
  const data = {
    message: 'This is a sample GET API respons',
    timestamp: new Date().toISOString(),
  };
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
