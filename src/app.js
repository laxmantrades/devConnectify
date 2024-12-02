const express = require("express");
const connectDb = require("../src/config/database");

const app = express();
const User = require("../src/models/user");

app.post("/signup", async (req, res) => {
  try {
    const user = await new User({
      firstName: "Laxman",
      lastName: "Giri",
      email: "laxman@gmail.com",
      age: 45,
      gender: "male",
    });
    //code to save the user
    user.save();

    res.send("Succesfully pushed information to DB");
  } catch (error) {
    console.error("Db could not be sent");
  }
});
connectDb().then(() => {
  app.listen(7777, () => {
    console.log("Server Started Succefully");
  });
});
