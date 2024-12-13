const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const { validatorForProfileChange } = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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
    if (!validatorForProfileChange(req)) {
      throw new Error("Sorry you can't edit the field");
    }
    const loggedInuser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));

    await loggedInuser.save();
    console.log(loggedInuser);
    res.json({
      message: `${loggedInuser.firstName} just updated your details`,
      data: loggedInuser,
    });

    //first find by id
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => {
        // Customize the message for 'firstName' field
        if (err.path === "firstName") {
          return "Invalid FirstName";
        }
        if (err.path === "lastName") {
          return "Invalid LastName";
        }
        return err.message; // Default to the original message for other fields
      });

      return res.status(400).json({ error: messages });
    }

    res.status(400).send("Error: " + error);
  }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const loggedInuser = req.user;

    //TODO_ change it to the req.user and validate user=findby
    const user = await User.findById(_id);

    //getting each value from the body
    let { currentPassword, newPassword, password } = req.body;

    //checking if the currentpassword matches the last password
    const isPasswordValid = await user.validatePassword(currentPassword);
    if (!isPasswordValid) {
      throw new Error("Password Doesn't Match");
    }

    //checking if the newpassword and the confirmed password(password) matches
    if (newPassword !== password) {
      res
        .status(400)
        .send("The new password and confirm password doesn't match");

      //checking if the currentpassword and newpassword matches
    } else if (currentPassword === password) {
      res.status(400).send("You can't change the same password");

      //if we pass all the checks then
    } else {
      // logic to has the new password
      const hashPassword = await bcrypt.hash(req.body.password, 10);

      //updating the new password with the hasedpassword
      loggedInuser.password = hashPassword;
      await loggedInuser.save();
    }
    //logic

    res.send("Succesfully Changed Password");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});
module.exports = profileRouter;
