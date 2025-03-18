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
        console.log('Tamir 1 running...')
        const queryStr = "SELECT * FROM Book LIMIT 10";
        const result = await main(queryStr);
        res.json(result);
    }   catch (error) {
        res.status(500).send("Error executing 1st API!");
    }
  });

app.get("/tamir2/", (req, res) => {
    res.send("Executing 2nd API!");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});