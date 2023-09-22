const mongoose = require("mongoose");
const arr=["Mathan","Sivaganesh","Roshan","Siva Guhan","Hari Muthu","Daniel","Lokesh","Bharath"]
const productSchema=mongoose.Schema({
user:{type:String,required:true,},//mongoose.Schema.Types.ObjectId,ref:"user"
name:{
type:String,
required:true
},
price:{type:Number,required:true},
startDate:{type:String,required:true},
req_by :{type:String} ,

endDate:{type:String},
address:String,
description:String,
image:String}
,{ timestamps: true }
)

const Product=mongoose.model("Product",productSchema);


module.exports=Product;