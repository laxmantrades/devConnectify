const express = require("express");
const authRouter = express.Router();
const { validate } = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //validating
    validate(req);
    const { firstName, lastName, emailId, password } = req.body;
    //encrypting
    const hashPassword = await bcrypt.hash(password, 10);

    //----->>>>creating new instances of the User Schema from the body
    const user = await new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    //code to save the user
    await user.save();

    res.send("Succesfully pushed information to DB");
  } catch (err) {
    res.send("Error saving the Database" + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //this will find the user by email from the db
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else if (isPasswordValid) {
      //Create a JWT TOKEN

      const token = await user.getJWT();

      //send token to the browser
      res.cookie("token", token);
      res.send("Login Successfull");
    }
  } catch (error) {
    res.status(400).send("Something went wrong " + error.message);
  }
});
authRouter.post("/signout",  (req, res) => {
  res.cookie("token", null).send("Logout Succesfull!");
});
module.exports = authRouter;
