//npm start

import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const retrieveProductsByCategory = () => {
    fetch("http://localhost:3000/retrieveProductsByCategory/")
      .then((response) => response.json())
      .then((data) => setMessage(JSON.stringify(data, null, 2)))
      .catch((error) => console.error("Error fetching message:", error));
  };

  const retrieveTotalSalesForEachProduct = () => {
    fetch("http://localhost:3000/retrieveTotalSalesForEachProduct/")
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
        <div className="button-group">
          <button className="task-button" onClick={retrieveProductsByCategory}>Retrieve Products By Category: (List API)</button>
          <button className="task-button" onClick={retrieveTotalSalesForEachProduct}>Retrieve TotalSales For Each Product: (Complex Query API)</button>
        </div>
      </div>

      {message && <p className="response">{message}</p>}
    </div>
  );
}

export default App;