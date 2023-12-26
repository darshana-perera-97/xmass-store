const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

// Sample JSON array of items
let items = [
  {
    name: 'Item 1',
    price: 10.99,
    amount: 50,
    imgUrl: 'https://example.com/item1.jpg',
    ratings: 4.5,
    additions: 'Free shipping',
    sizes: ['Small', 'Medium', 'Large'],
  },
  // Add more items as needed
];

// Use cors middleware
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API to view all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// API to add a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
