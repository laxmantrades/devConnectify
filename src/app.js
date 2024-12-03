const express = require("express");
const connectDb = require("../src/config/database");

const app = express();
const User = require("../src/models/user");
const { validate } = require("./utils/validator");
const bcrypt=require("bcrypt")


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
    const findEmail = await req.body.emailId;

    const userEmail = await User.findOne({ emailId: findEmail });
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
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findByIdAndDelete(userId);

    if (user === null) {
      res.send("User is not in the database");
    } else {
      res.send("Deleted Succesfully");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});
//This will update the collection
app.patch("/user", async (req, res) => {
  try {
    const userID = req.body._id;
    const needtoUpdate = req.body;
    const AllOWEDUPDATES = ["_id","photoUrl", "gender", "age", "about", "skills"];
    const isUpdatedAllowed = Object.keys(needtoUpdate).every((k) =>
      AllOWEDUPDATES.includes(k)
    );
    if (!isUpdatedAllowed) {
      throw new Error("You can't update ");
    }
    if (needtoUpdate?.skills?.length > 10) {
      throw new Error("Skills can't be more then 10");
    }

    await User.findByIdAndUpdate(userID, needtoUpdate, { runValidators: true });
    //The first argument is to find the document second is update
    //await User.findOneAndUpdate({age:userID},needtoUpdate)
    res.send("Succesfully updated the data");
  } catch (error) {
    res.status(401).send("Something went wrong "+ error.message);
  }
});

app.post("/signup", async (req, res) => {
  try {

    
    //validating 
    validate(req)
    const {firstName,lastName,emailId,password}=req.body
    //encrypting
    const hashPassword=await bcrypt.hash(password,10)
    
   
    

    //----->>>>creating new instances of the User Schema from the body 
    const user = await new User({
      firstName,lastName,emailId,password:hashPassword
    });

    //code to save the user
    await user.save();

    res.send("Succesfully pushed information to DB");
  } catch (err) {
    res.send("Error saving the Database" + err.message);
  }
});
app.post("/login",async (req,res)=>{
  try {
    const {emailId,password}=req.body
    //this will find the user by email from the db
    const user=await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid Credentials")
    }
    const haspassword=await bcrypt.compare(password,user.password)
    
    if (!haspassword) {
     throw new Error("Invalid Credentials")
      
    }
    else if(haspassword) {
      res.send("Login Successfull")
    }

    
  } catch (error) {
    res.status(400).send("Something went wrong"+error.message)
  }
})
connectDb().then(() => {
  app.listen(7777, () => {
    console.log("Server is listening to port 7777");
  });
});
