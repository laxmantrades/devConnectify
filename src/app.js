const express = require("express");

const app = express();



app.get("/user",(req,res)=>{
  //try {
    throw new Error("laxman")
  res.send("User is good")
 // } catch (error) {
  //  res.send("Something went wrong")
  //}
  
})
app.use("/",(err,req,res,next)=>{
  if (err) {
    res.send("This is a error")
  }
  
})



//--The order is very important--//

app.listen(7777, () => {
  console.log("Server started succesfully");
});
