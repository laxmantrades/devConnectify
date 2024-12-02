const express = require("express");

const app = express();

//--The order is very important--//

app.get(
  "/user",
  (req, res, next) => {
    
    console.log("This is a first request");
    next()
    //res.send("Response 1")
    
  },
  [(req, res, next) => {
    console.log("This is a second request");
    //res.send("Response 2")
    next()
  }],
  [(req, res, next) => {
    console.log("This is a Third request");
    //res.send("Response 3")
    next()
  }],
  (req, res, next) => {
    
    console.log("This is a Fourth request");
    res.send("Response 4")
    next()
    
  }
);

//----This means the url that ends with fly ----//

/*app.get(/.*fly$/, (req, res) => {
 //----->>If i have /a/ then the letter shoulld have atleast one a
  
  res.send({ firstname: "Ram", lastName: "Giri" });
});

app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

/*app.get("/user", (req, res) => {
 
  console.log(req.query) //------>>>>>{ userId: '105' }

  //--http://localhost:7777/user?105==>>>>>>>>  { '105': '' }   --//
  //--http://localhost:7777/user?userID=105==>>>>>>>>  { 'userId': '105' }   --//
  res.send({ firstname: "Ram", lastName: "Giri" });
});


/*
app.get("/user/:userId/:name/:age", (req, res) => {
  console.log(req.params);  //--->>{ userId: '200', name: 'laxman', age: '45' }
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
