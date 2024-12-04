const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const { validatorForProfileChange } = require("../utils/validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //this user is from userAuth
    if(!validatorForProfileChange(req)){
        throw new Error("Sorry you can't edit the field")
    }
    const loggedInuser = req.user;

    Object.keys(req.body).forEach(
      (key) => (loggedInuser[key] = req.body[key])
    );
    res.json({
      message: `${loggedInuser.firstName} just updated your details`,data:loggedInuser
    });
    await loggedInuser.save()
    console.log(loggedInuser);
    
    //first find by id
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
  
});
profileRouter.patch("/profile/password",userAuth,(req,res)=>{
    try {
        res.send("Edited successfully")
    } catch (error) {
        res.status(400).send("Error: "+error.message)
    }
  })
module.exports = profileRouter;
