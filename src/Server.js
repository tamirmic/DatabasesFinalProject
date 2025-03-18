//go to src folder and run the following command to start the server
//node --watch-path=./src src/Server.js 

const express = require("express");
const cors = require("cors");
const { main } = require("./Database");
const { tamir1 } = require("./Database");


const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("CSS 475 Web Service");
});

app.get("/tamir1/", async (req, res) => {
    try {
        console.log('Tamir 1 running...')
        res.send("Executing 1nd API!");
        const rows = await tamir1();
        // Send the rows as JSON response to the client
        //res.json({ message: "Executing tamir1 API!", data: rows });
    }   catch (error) {
        const errMessage = "Error executing tamir1 API!" + error;
        console.log(errMessage)
        res.status(500).send(errMessage);
    }
});
  

app.get("/tamir2/", (req, res) => {
    res.send("Executing 2nd API!");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});