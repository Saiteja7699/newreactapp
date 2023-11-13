import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa'; // Import the GitHub icon
import axios from 'axios';
import './styles/App.scss';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0); // New state variable for total cost


  useEffect(() => {
    // Fetch the list of items from the Node.js backend
    axios.get('http://localhost:3001/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleItemClick = (itemId, itemName) => {
    // Call the backend to generate a random cost for the selected item
    axios.post('http://localhost:3001/generateCost', { itemId, itemName })
      .then(response => {
        const newItem = { id: response.data.itemId, name: response.data.itemName, cost: response.data.cost };
        setSelectedItems(prevItems => [...prevItems, newItem]);
        setTotalCost(prevTotalCost => prevTotalCost + response.data.cost); // Update total cost

      })
      .catch(error => console.error('Error generating cost:', error));
  };

  return (
    <div>
      <header>
        <h1>Grocery List</h1>
        <a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
      </header>
      <div className="container">
        <div>
          <h2>Available Items</h2>
          <ul>
            {items.map(item => (
              <li key={item.id} onClick={() => handleItemClick(item.id, item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="selected-container">
          <h2>Selected Items</h2>
          <div className="selected-items">
            <ul>
              {selectedItems.map(item => (
                <li key={item.id}>
                  {item.name} - Cost: {item.cost}
                </li>
              ))}
            </ul>
            <p>Total Cost: {totalCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
