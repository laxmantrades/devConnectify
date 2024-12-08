const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const feedProfile="firstName lastName photoUrl about skills"
    const page=parseInt(req.query.page) || 1
    limit=parseInt(req.query.limit)  || 10
    limit=limit>50?50 : limit
    let skip=(page-1)*limit
    console.log(page,limit);
    


    //find the list that a person is stored in connection collection
    const findConnectionCollection = await ConnectionRequest.find({
      $or: [{ fromUserID: loggedInUser._id }, { toUserID: loggedInUser._id }],
    }).select("fromUserID toUserID");

    //now sorting
    const hideUsersList=new Set()
    //now pushing each item to hideUerslist
    findConnectionCollection.forEach((req) => {
      hideUsersList.add(req.fromUserID.toString())
      hideUsersList.add(req.toUserID.toString())
    });
    //now searching from user Collection that doesn't have any connection
    const showuser= await User.find({
      $and:[
        {_id:{$nin:Array.from(hideUsersList)}},
        {_id:{$ne:loggedInUser._id}}
      ]
    }).select(feedProfile).skip(skip).limit(limit)
    
    res.send(showuser);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

module.exports = userRouter;
