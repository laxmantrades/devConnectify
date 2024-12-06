const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/:status/:userID", userAuth, async (req, res) => {
  try {
    const fromUserID = req.user._id;
    const toUserID = req.params.userID;
    const status = req.params.status;

    //We can write the logic for if fromUserId to touseId is same here but i will write in schema level to learn .pre

    //datavalidation for status
    const AllowedConnection = ["ignored", "interested"];
    if (!AllowedConnection.includes(status)) {
      throw new Error("Only interested and ignored allowed");
    }
    // data validation for userID
    const user = await User.findById(toUserID);
    if (!user) {
      throw new Error("User not found");
    }
    //validation what if to user wants to send the connection to me
    const checkBothUserStatus = await ConnectionRequest.findOne({
      $or: [
        { fromUserID, toUserID }, //finds that contains fromuserId and touserId, a scpecifi one
        { fromUserID: toUserID, toUserID: fromUserID }, //finds if the request is from toUserId("laxman") to fromUserId("himal")
      ],
    });
    if (checkBothUserStatus) {
      throw new Error("Connection alreday exists");
    }

    //save into the database
    const createConnectionRequest = await new ConnectionRequest({
      fromUserID,
      toUserID,
      status,
    }).save();

    //TODO to make it dynamic

    res.send("Succefully send a request");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = requestRouter;
