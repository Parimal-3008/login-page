const express =require("express");
const bodyparser =require("body-parser");
const ejs =require("ejs");
const mongoose =require("mongoose");
const http = require('http')
const path =require("path");
const port = 3000;
const app= express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "static")));
console.log(__dirname);
app.listen(3000, function(){
    console.log("server started on 3000");
});

const fileP= path.join(__dirname+"/public");
const schema=new mongoose.Schema({uid:String, pw:String});
const f1=mongoose.model("account",schema);
mongoose.connect("mongodb://localhost/logindb", { useNewUrlParser: true });

app.get("/",function(req, res)
{
    res.sendFile(path.join(fileP,"/login.html"));
});
const MongoClient = require("mongodb");
const url = 'mongodb://localhost:27017/';
const databasename = "logindb";  // Database name

app.post("/register",function(req,res){
          const f2=new f1({uid:req.body.n1, pw:req.body.n2});
          f2.save();
        });
app.post("/login",function(req,res){
  
    (f1.findOne({uid:req.body.n3},function(err, founduser){
        console.log(err);
     if(err)
     console.log(err);
     else
     {
         if(founduser)
        {
             console.log(founduser);
             if(founduser.pw === req.body.n4)
             console.log("Login successfull");
             else
             console.log("Incorrect password");
             
        }
         else
         console.log("Invalid username");
     }
    }));
   
  
});

