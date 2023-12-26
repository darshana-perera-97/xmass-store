import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    amount: 0,
    imgUrl: "",
    ratings: 0,
    additions: "",
    sizes: [],
  });

  useEffect(() => {
    fetchItems();
    console.log(items)
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        fetchItems();
        setNewItem({
          name: "",
          price: 0,
          amount: 0,
          imgUrl: "",
          ratings: 0,
          additions: "",
          sizes: [],
        });
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> - ${item.price} - {item.amount} in
            stock
          </li>
        ))}
      </ul>
      <h2>Add New Item</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={newItem.price}
          onChange={handleInputChange}
        />

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={newItem.amount}
          onChange={handleInputChange}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="imgUrl"
          value={newItem.imgUrl}
          onChange={handleInputChange}
        />

        <label>Ratings:</label>
        <input
          type="number"
          name="ratings"
          value={newItem.ratings}
          onChange={handleInputChange}
        />

        <label>Additions:</label>
        <input
          type="text"
          name="additions"
          value={newItem.additions}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </form>
    </div>
  );
}

export default App;
