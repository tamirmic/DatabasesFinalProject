//go to src folder and run the following command to start the server
//node --watch-path=./src src/Server.js 

const express = require("express");
const cors = require("cors");
const { retrieveProductsByCategory, retrieveTotalSalesForEachProduct } = require("./Database");


const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("CSS 475 Web Service");
});


app.get("/retrieveProductsByCategory/", async (req, res) => {
    try {
        const category = req.query.category;
        console.log('Server.retrieveProductsByCategory() -> running...')
        const rows = await retrieveProductsByCategory(category);
        // Send the rows as JSON response to the client
        res.json({ message: "Server.retrieveProductsByCategory() -> executing API!", data: rows });
    }   catch (error) {
        const errMessage = "Server.retrieveProductsByCategory() -> Error executing API!" + error;
        console.log(errMessage)
        res.status(500).send(errMessage);
    }
});
  

app.get("/retrieveTotalSalesForEachProduct/", async (req, res) => {
    try {
        console.log('Server.retrieveTotalSalesForEachProduct() -> running...')
        const rows = await retrieveTotalSalesForEachProduct('Electronics');
        // Send the rows as JSON response to the client
        res.json({ message: "Server.retrieveTotalSalesForEachProduct() -> executing API!", data: rows });
    }   catch (error) {
        const errMessage = "Server.retrieveTotalSalesForEachProduct() -> Error executing API!" + error;
        console.log(errMessage)
        res.status(500).send(errMessage);
    }
});

