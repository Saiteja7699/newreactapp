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
      axios.get('http://localhost:3001/cost')
      .then(response => {
        const newItem = { id: itemId, name: itemName, cost: response.data.cost };
        setSelectedItems(prevItems => [...prevItems, newItem]);
        setTotalCost(prevTotalCost => prevTotalCost + response.data.cost);
      })
      .catch(error => console.error('Error generating cost:', error));
  };

  return (
    <div>
      <header>
        <h1>Grocery List</h1>
        <a href="https://github.com/Saiteja7699/newreactapp" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
      </header>
      <div className="container">
        <div>
          <h2>Available Items</h2>
          <div className="selected-items">
          <ul>
            {items.map(item => (
              <li key={item.id} onClick={() => handleItemClick(item.id, item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
          </div>
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
