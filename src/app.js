const express = require("express");
const connectDb = require("../src/config/database");
const http=require("http")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const initializeSocket = require("./utils/socket");
require('dotenv').config()
require("./utils/cronjob")

//This will convert the json object from all the routes and methods
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const server=http.createServer(app)
initializeSocket(server)

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const projectRouter=require("./routes/project")
const chatRouter=require("./routes/chat")

//This will get profile
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/",projectRouter)
app.use("/",chatRouter)

connectDb().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Server is listening to port --");
  });
});
