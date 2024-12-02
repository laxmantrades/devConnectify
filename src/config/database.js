const mongoose = require("mongoose");



const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Node:WrKJ68BjbWKnXOXO@cluster0.ckzzq.mongodb.net/devTinder"
    );
    console.log("DB Connection Started");
    
  } catch (error) {
    console.error("Could not connect db");
  }
};
module.exports=connectDb;
