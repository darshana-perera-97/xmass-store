const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

let items = [
  {
    name: 'Item 2',
    price: 10.99,
    amount: 50,
    imgUrl: 'https://example.com/item1.jpg',
    ratings: 4.5,
    additions: 'Free shipping',
    sizes: ['Small', 'Medium', 'Large'],
  },
  // Add more items as needed
];

app.use(cors());
app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// New API to delete an item by its index
app.delete('/api/items/:index', (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < items.length) {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
