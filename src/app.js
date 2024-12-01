const express = require("express");

const app = express();

//--The order is very important--//

app.get("/user", (req, res) => {
  res.send({ firstname: "Ram", lastName: "Giri" });
});



//--Only abcd and ad will work here-- if we add + instead or ? then abcd or abcbcbcbcbd will only work//
/*app.get("/user/a(bc)+d", (req, res) => {
    res.send({ firstname: "Laxman", lastName: "Giri" });
  });

//--This means the there can be anything between ab and c like abcdfdfdc--//
/*app.get("/user/ab*c", (req, res) => {
    res.send({ firstname: "Ram", lastName: "Giri" });
  });

/*-- //--That means b can be as many as we want like abc or abbbbbc this will only work--//
app.get("/user/ab+c", (req, res) => {
  res.send({ firstname: "Laxman", lastName: "Giri" });
});

//--a nd c is compulsory but b i optional /user/ac or /abc only--//
/*app.get("/user/ab?c",(req,res)=>{  
    res.send({firstname:"Laxman",lastName:"Giri"})
})


/*app.post("/user",(req,res)=>{
    //Db logic here here and then
    res.send("Succefully send data to Db")
})

/*app.delete("/user",(req,res)=>{
    res.send("Succesfully deleted the data")
}) 

/*app.use("/user", (req, res) => {
  res.send("This is a user profile");
});*/

app.listen(7777, () => {
  console.log("Server started succesfully");
});
