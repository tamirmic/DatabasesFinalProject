//run npm start

import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const tamir1 = () => {
    fetch("http://localhost:3000/tamir1/")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching message:", error));
  };

  const tamir2 = () => {
    fetch("http://localhost:3000/tamir2/")
      .then((response) => response.text())
      .then((data) => setMessage(data))
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
          <button className="task-button" onClick={tamir1}>Tamir1: List API (40 points)</button>
          <button className="task-button" onClick={tamir2}>Tamir2: Complex Query (60 points)</button>
        </div>
      </div>

      {message && <p className="response">{message}</p>}
    </div>
  );
}

export default App;