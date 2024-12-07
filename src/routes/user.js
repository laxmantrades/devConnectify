const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const isLoggedinUser = req.user;

    const findConnection = await ConnectionRequest.find({
      toUserID: isLoggedinUser._id,
      status: "interested",
    }).populate("fromUserID", "firstName lastName photoUrl");

    const data = findConnection.map((row) => row.fromUserID); //this will basically give me the data of the fromuserId only

    res.json({
      message: "Succefully fetched the information",
      data: data,
    });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const findAcceptedConnection = await ConnectionRequest.find({
      $or: [
        { toUserID: loggedInUser._id, status: "accepted" },
        { fromUserID: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserID", "firstName lastName photoUrl")
      .populate("toUserID", "firstName lastName photoUrl");

    const data = findAcceptedConnection.map((row) => {
      if (row.fromUserID._id.equals(loggedInUser._id)) {
        return row.toUserID;
      }
    
        return row.fromUserID;
      
    });

    res.json({
      message: "Succefully fetched the data",
      data: data,
    });
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

module.exports = userRouter;
