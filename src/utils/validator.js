const validator = require("validator");

const validate = (req) => {
  const { firstname, lastName, emailId, password } = req.body;
  if (!firstname && !lastName) {
    throw new Error("Please enter a valid name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email!");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter a strong password!")
  }
};

module.exports={validate}