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

    const decodeMessage = await jwt.verify(token, process.env.JWT_SECRETKEY);

    //get the user data

    const { _id } = decodeMessage;
    const user = await User.findById(_id).select("firstName lastName photoUrl");
    if (!user) {
      throw new Error("User not found ");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error this is userAuthç: " + error.message);
  }
};
module.exports = {
  userAuth,
};
