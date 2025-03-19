import { useState } from "react";
import "./App.css";

function App() {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);  // Default state as an array
  const [message, setMessage] = useState("");

  const retrieveProductsByCategory = async () => {
    if (category.trim() === "") {
      setMessage("Please enter a category!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/retrieveProductsByCategory?category=${category}`);
      const result = await response.json();

      if (Array.isArray(result.data)) {  // Extract 'data' array
        setData(result.data);
        setMessage("");
      } else {
        setMessage("Invalid data format received");
        console.error("Expected an array but got:", result);
        setData([]);  // Reset table data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data");
      setData([]);  // Reset table data
    }
  };

  const retrieveTotalSalesForEachProduct = async () => {
    if (category.trim() === "") {
      setMessage("Please enter a category!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/retrieveTotalSalesForEachProduct?category=${category}`);
      const result = await response.json();

      if (Array.isArray(result.data)) {  // Extract 'data' array
        setData(result.data);
        setMessage("");
      } else {
        setMessage("Invalid data format received");
        console.error("Expected an array but got:", result);
        setData([]);  // Reset table data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data");
      setData([]);  // Reset table data
    }
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
        <input type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <div className="button-group">
          <label>Retrieve all products from category: (List API)</label>
          <button className="task-button" onClick={retrieveProductsByCategory}>Execute</button>
        </div>
        <div className="button-group">
          <label>Retrieve the latest sale date and total number of sales for each product from category: (Complex Query API)</label>
          <button className="task-button" onClick={retrieveTotalSalesForEachProduct}>Execute</button>
        </div>
      </div>

      {message && <p className="response">{message}</p>}

      {/* Render Table if Data Exists */}
      {data.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
