const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");

requestRouter.post("/connectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " sent a request");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = requestRouter ;
