const express = require("express");

const app = express();

//--The order is very important--//

app.get("/user",(req,res)=>{
    res.send("Succesfully got the user data")
})

app.post("/user",(req,res)=>{
    //Db logic here here and then
    res.send("Succefully send data to Db")
})

app.delete("/user",(req,res)=>{
    res.send("Succesfully deleted the data")
})

app.use("/user", (req, res) => {
  res.send("This is a user profile");
});


app.listen(7777, () => {
  console.log("Server started succesfully");
});
