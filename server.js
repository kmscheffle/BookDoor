const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // You can change the port number if needed

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!'); // Example route
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});