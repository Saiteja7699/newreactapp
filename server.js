const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

// Mock data for items
const itemList = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Milk' },
  { id: 5, name: 'Orange' },
  { id: 6, name: 'Chicken' },
];

// Endpoint to get the list of items
app.get('/items', (req, res) => {
  res.json(itemList);
});

// Endpoint to generate a random cost for an item
app.post('/generateCost', (req, res) => {
  const itemId = req.body.itemId;
  const itemName = req.body.itemName;
  // Generate a random cost (replace this with your logic) 
  const randomCost = Math.floor(Math.random() * 100) + 1;
  res.json({ itemId, itemName, cost: randomCost });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
