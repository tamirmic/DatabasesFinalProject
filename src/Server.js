//node --watch-path=. Server.js 

const express = require("express");
const cors = require("cors");
const { main } = require("./Database");


const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("CSS 475 Web Service");
});

app.get("/tamir1/", async (req, res) => {
    try {
      console.log('Tamir 1 running...');
      const queryStr = "SELECT * FROM Book LIMIT 10;";
      const result = await main(queryStr);
      console.log('Query Result:', result);
      if (result && result.length > 0) {
        res.json(result); // Send back the result as JSON
      } else {
        res.status(404).send("No data found");
      }
    } catch (error) {
      console.error('Error during query execution:', error); // Log any errors
      res.status(500).send("Error executing 1st API!");
    }
});
  

app.get("/tamir2/", (req, res) => {
    res.send("Executing 2nd API!");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});