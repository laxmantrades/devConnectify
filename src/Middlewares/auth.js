const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //read the token
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Pleasse login");
    }

    //validate the token

    const decodeMessage = await jwt.verify(token, "Laxman@123");

    //get the user data
    if (!decodeMessage) {
      throw new Error("User not found ");
    }
    const { _id } = decodeMessage;
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (error) {
    res.send("Error: " + error.message);
  }
};
module.exports = {
  userAuth,
};
