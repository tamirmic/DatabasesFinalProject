//npm start

import { useState } from "react";
import "./App.css";

function App() {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const retrieveProductsByCategory = () => {

    if (category.trim() === "") {
      setMessage("Please enter a category!");
      return;
    }

    fetch(`http://localhost:3000/retrieveProductsByCategory?category=${category}`)
    .then((response) => response.json())
      .then((data) => setMessage(JSON.stringify(data, null, 2)))
      .catch((error) => console.error("Error fetching message:", error));
  };

  const retrieveTotalSalesForEachProduct = () => {

    if (category.trim() === "") {
      setMessage("Please enter a category!");
      return;
    }

    fetch(`http://localhost:3000/retrieveTotalSalesForEachProduct?category=${category}`)
    .then((response) => response.json())
    .then((data) => setMessage(JSON.stringify(data, null, 2)))
    .catch((error) => console.error("Error fetching message:", error));
};


  return (
    <div className="container">
      <header>
        <h1>CSS 475 Final Project</h1>
        <h2>Team name: Team 1</h2>
        <h3>Members: Julia Nguyen, Jason Xu, Joel Yim, Tamir Michaely</h3>
      </header>

      <div className="card">
        <label>Enter a category</label>
        <input type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}/>
        <div className="button-group">
          <label>Retrieve all products from category: (List API)</label>
          <button className="task-button" onClick={retrieveProductsByCategory}>Execute</button>
        </div>
        <div className="button-group">
          <label>Retrieve total sales for each product from category: (Complex Query API)</label>
          <button className="task-button" onClick={retrieveTotalSalesForEachProduct}>Execute</button>
        </div>
      </div>

      {message && <p className="response">{message}</p>}
    </div>
  );
}

export default App;