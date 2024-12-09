const express = require("express");
const connectDb = require("../src/config/database");

const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//This will convert the json object from all the routes and methods
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

//This will get profile
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDb().then(() => {
  app.listen(7777, () => {
    console.log("Server is listening to port 7777");
  });
});
