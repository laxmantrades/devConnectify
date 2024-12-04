const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// creating userSchema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 40,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 40,
    },
    emailId: {
      type: String,
      required: true,

      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 40,

      lowercase: true,
      /* match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],*/
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email " + value);
        }
      },
    },
    password: {
      type: String,
      minLength: 6,
      /*match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ],*/
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Use strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 1,
      max: 100,
    },
    gender: {
      type: String,

      validate(value) {
        if (!["male", "female", "Other"].includes(value)) {
          throw new Error("not a valid gender");
        }
      },

      lowercase: true,
      trim: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Not a valid Url");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about me ",
      maxLength: 500,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  //creating token
  const token = await jwt.sign({ _id: user._id }, "Laxman@123", {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByuser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordInputByuser, user.password);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
