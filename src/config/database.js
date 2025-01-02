const mongoose = require("mongoose");



const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECIONSTRING
    );
    console.log("DB Connection Started");
    
  } catch (error) {
    console.error("Could not connect db"+error.message);
  }
};
module.exports=connectDb;
