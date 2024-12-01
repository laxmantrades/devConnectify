const express = require("express");

const app = express();

app.use("/dashbaord", (req, res) => {
  res.send("This is a dashboard!");
});
app.use("/hello", (req, res) => {
  res.send("This is a hello!");
});
app.use("/path", (req, res) => {
  res.send("Hello from the path");
});
app.listen(7777, () => {
  console.log("Server started succesfully");
});
