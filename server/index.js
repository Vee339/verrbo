const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || "8888";

app.get("/", (req, res) => {
  res.send("This is the test command.");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
