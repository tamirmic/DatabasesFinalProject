const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("CSS 475 Web Service");
});

app.get("/tamir1/", (req, res) => {
    res.send("Executing 1st API!");
});

app.get("/tamir2/", (req, res) => {
    res.send("Executing 2nd API!");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});