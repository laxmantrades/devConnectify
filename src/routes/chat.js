const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const chatSchema = require("../models/chatSchema");
const connectionRequest = require("../models/connectionRequest");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { targetUserId } = req.params;
    const connection = await connectionRequest.findOne({
      $or: [
        {
          fromUserID: _id,
          toUserID: targetUserId,
          status:"accepted"
        },
        {
            fromUserID:targetUserId ,
            toUserID:_id ,
            status:"accepted"
          },
      ],
    });
    if(!connection){
        return res.status(404).json({
           message: "Sorry you are not connected"
        })
    }
    

    let chat = await chatSchema
      .findOne({
        participants: {
          $all: [_id, targetUserId],
        },
      })
      .populate({
        path: "messages.senderId", // Populate senderId in each message
        select: "firstName lastName photoUrl", // Select only the fields you need
      })
     

      if (!chat) {
        chat = new chatSchema({
          participants: [_id, targetUserId],
          message: [],
        }) 
       
          
      }
   
      
      
     chat=await chat .populate({
        path: "participants",
        select: "firstName lastName photoUrl",
      });
    
    res.status(200).json({
      chat,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = chatRouter;
