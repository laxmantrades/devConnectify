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
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    //send token to the browser

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({
      message: "Succesfully Signed up!",
      data: { savedUser },
    });
  } catch (err) {
    res.status(400).send(err);
    

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
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong " + error.message);
  }
});
authRouter.post("/signout", (req, res) => {
  res.cookie("token", null).send("Logout Succesfull!");
});
module.exports = authRouter;
