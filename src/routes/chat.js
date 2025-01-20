const express=require("express")
const { userAuth } = require("../Middlewares/auth")
const chatSchema = require("../models/chatSchema")
const chatRouter=express.Router()

chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{
   
try {
    const {_id}=req.user
    const {targetUserId}=req.params
    console.log(targetUserId);
    
    
    const chat=await chatSchema.findOne({
        participants:{
            $all:[_id,targetUserId]
        }
    }).populate({
        path: 'messages.senderId', // Populate senderId in each message
        select: 'firstName lastName photoUrl', // Select only the fields you need
       
      }).populate({
        path:"participants",
        select: 'firstName lastName photoUrl',
      })
    
    
    if(!chat){
        return res.json({
            message:"No chat found"
        })
    }
    res.json({
       chat
    })
} catch (error) {
    console.log(error);
    
}
})

module.exports=chatRouter