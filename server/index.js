const express = require("express");
const mongoose=require("mongoose");
const app=express();
const Product =require("./models/Product")
const UserModel=require("./models/User")
const cors=require("cors");
const bodyParser = require('body-parser')
const cookieParser =require("cookie-parser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
var ls = require('local-storage');


const asyncHandler=require("express-async-handler");
const { findOneAndUpdate } = require("./models/Product");

app.use(cookieParser());
app.use(express.json({limit: "50mb",extended:true}))
app.use(express.urlencoded({limit: "50mb",extended:true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin: true,
  credentials: true,}));
// app.use(express.json());
try{
   mongoose.connect("mongodb+srv://mathan811:Mathan.81102@retus.ikbdcuc.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true
}).then(()=>{console.log("Database connection is established")});}
catch(err){
console.log(err,"Mongo Db not connected")}

//middleware



//middleware


 
app.get("/",asyncHandler(async(req,res)=>{
    res.send("Hi it is working");
}))




app.post("/login",async (req,res)=>{
const {username,password}=req.body;
UserModel.findOne({username:username}, function (err, user) {
  if (err){
      console.log(err)
  }
  else{
  if(user){
    if(bcrypt.compare(password,user.password)){
      console.log("Valid User");
      res.status(200).json({user:user.username,status:"1"});
    }
    else{
    console.log("Invalid Password");
    res.status(200).json("Invalid Password");
  }}
  else{
  console.log("User Not Registered");
  res.status(200).json("User Not Registered");
  }
  }

})
});
app.post("/register",asyncHandler(async(req,res)=>{
  const username=req.body.username;
  const email=req.body.email;
  const password =req.body.password;
  const salt=await bcrypt.genSalt(10);
  const hashedpassword=await bcrypt.hash(password,salt);

  UserModel.findOne({username:username}, function (err, user) {
    if (err){
        console.log(err)
    }
    else{
      if(user){
        console.log("User Already Exists");
      res.status(200).json("User Already exists");
      }
      else{
        const user= new UserModel({username:username,email:email,
          password:hashedpassword})
      try{
          user.save(function(err) {
          if (err)
             throw err;
          else 
             console.log('saved user successfully...');
          });
          res.status(201).json({user:user.username})

         
        }
      catch(err){
      console.log(err)}
     
      }
    }
});

}))

app.post("/getProduct",async (req,res)=>{
try{

  if(req.body.status=="1"){
    const lessoritem=await Product.find({user:req.body.username})
    // console.log(lessoritem);
     res.json(lessoritem);

    
  }
 else if(req.body.status=="0"){
  const item =await Product.find()
  res.status(200).json(item);
} 
else if(req.body.status=="2" ||  res.body==null){
  const lesseeitem=await Product.find({req_by:req.body.request_by})
  res.status(200).json(lesseeitem);
} 

  } catch (error) {
  res.status(404).json({ message: error.message });
  }
})

app.post("/addProduct",async (req,res)=>{
const product=new Product(req.body);
try{
await product.save();
res.status(201).json(product);
}catch(err)
{
console.log(err,"Error in adding the product")
}
})

app.post("/setStatus",async (req,res)=>{
  console.log("Status \n",req.body)
  const {byer,seller,product,rentDate}=req.body;
  Product.findOneAndUpdate({user:seller,name:product},{req_by:byer,startDate:rentDate},null,function(err,pdt){
    if(err)
    console.log("Find and update Error",err)
  })
})

app.post("/deleteProduct",async(req,res)=>{
const {pdt_name,user_name}=req.body;
Product.findOneAndDelete({name:pdt_name,user:user_name},async (err,items)=>{
  if (err){
    console.log("Error in Deleting item ",err)
}else{
  console.log(`Deleted item : ${pdt_name} ${user_name} ` );
  res.status(200).json("Product Deleted")
}
})
})


app.listen(3001,()=>{
console.log("Server Running on Port 3001");});



