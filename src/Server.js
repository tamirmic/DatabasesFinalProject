//go to src folder and run the following command to start the server
//node --watch-path=./src src/Server.js 

const express = require("express");
const cors = require("cors");
const { tamir1, tamir2 } = require("./Database");


const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("CSS 475 Web Service");
});


app.get("/tamir1/", async (req, res) => {
    try {
        console.log('Server.tamir1() -> running...')
        const rows = await tamir1();
        // Send the rows as JSON response to the client
        res.json({ message: "Server.tamir1() -> executing API!", data: rows });
    }   catch (error) {
        const errMessage = "Server.tamir1() -> Error executing API!" + error;
        console.log(errMessage)
        res.status(500).send(errMessage);
    }
});
  

app.get("/tamir2/", async (req, res) => {
    try {
        console.log('Server.tamir2() -> running...')
        const rows = await tamir2();
        // Send the rows as JSON response to the client
        res.json({ message: "Server.tamir2() -> executing API!", data: rows });
    }   catch (error) {
        const errMessage = "Server.tamir2() -> Error executing API!" + error;
        console.log(errMessage)
        res.status(500).send(errMessage);
    }
});

