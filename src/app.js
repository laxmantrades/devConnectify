const express = require("express");
const connectDb = require("../src/config/database");

const app = express();
const User = require("../src/models/user");

//This will convert the json object to all the routes and methods
app.use(express.json());

//This will find all the users present in my collection
app.get("/feed", async (req, res) => {
  try {
    const userEmail = await User.find({});
    if (userEmail.length === 0) {
      res.send("No user found");
    } else {
      res.send(userEmail);
    }
  } catch (error) {
    res.status(400).send("Soemthing went wrong");
  }
});

//This will find one user present in my collection
app.get("/user", async (req, res) => {
  try {
    //finding by email id
    const findEmail = await req.body.emailId
   

    const userEmail = await User.findOne({emailId:findEmail});
    if (!userEmail) {
      res.send("Could not find the emailid");
    } else {
      res.send(userEmail);
    }
    
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});
//This will delete the collection 
app.delete("/user",async(req,res)=>{
  
  try {
    const userId=req.body.userId
    
    
    const user=await  User.findByIdAndDelete(userId)
    
    
    if(user===null){
      res.send("User is not in the database")
    }
    else{
      res.send("Deleted Succesfully")
    }
    
    
  } catch (error) {
    res.status(400).send("Something went wrong")
  }

})
//This will update the collection
app.patch("/user",async(req,res)=>{

  try {
    const userID=req.body.age
    const needtoUpdate=req.body
    //await User.findByIdAndUpdate(userID,needtoUpdate)
    //The first argument is to find the document second is update 
    await User.findOneAndUpdate({age:userID},needtoUpdate)
    res.send("Succesfully updated the data")
    
  } catch (error) {
    res.status(401).send("Something went wrong")
  }
})





app.post("/signup", async (req, res) => {
  try {
    //---this req.body is the json we created from postman---//
    const userEmail = req.body;

    //----->>>>creating new instances of the User Schema
    const user = await new User(userEmail);
    //code to save the user
    user.save();

    res.send("Succesfully pushed information to DB");
  } catch (error) {
    console.error("Db could not be sent");
  }
});
connectDb().then(() => {
  app.listen(7777, () => {
    console.log("Server is listening to port 7777");
  });
});
