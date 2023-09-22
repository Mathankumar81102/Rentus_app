import React from 'react'
import { useNavigate  } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Axios from "axios";
import { useEffect } from 'react';


function Cards(props) {
  const navigate=useNavigate();

useEffect(()=>{
props.setNumber((count)=>count+1);
},[])

  const date = new Date()
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const fullDate =  `${year}-${month}-${day}`;
    function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
    function parseDate(str) {
     var mdy = str.split('-');
     return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}
  const rem_Date=datediff(parseDate(fullDate), parseDate(props.data.endDate));
  if(rem_Date==0){
    async function  deletepdt(){
      try{
       await Axios.post ("http://localhost:3001/deleteProduct",{pdt_name:props.data.name,user_name:props.data.user})
     .then((response)=>{
      //  const itm=response.data;
      //  items.push(itm);
     
       alert("Product Deleted Successfully");
     
     }).catch(()=>{alert("Failed To Delete The Product")} );
     
     }
     catch(err){
     console.log(err,"Error in post Axios");
     }
    }
    deletepdt();  
    return 0;
  }

  

  async function handleClick(e){
    e.preventDefault();
    const value=confirm("Are You Sure to get this Product ?"); 
    console.log(value);
  const date = new Date()
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const fullDate =  `${year}-${month}-${day}`;
  if(value==true){
    navigate("/Home/Lessee")
      await Axios.post ("http://localhost:3001/setStatus",{byer:localStorage.getItem("user"),product:props.data.name,seller:props.data.user,rentDate:fullDate}).then((response)=>{
      
    })
    }
  }
  return (
    
    //Use useNavigate instead of link so that the component can be called along with its property
    <Link className='border-none shadow-2xl rounded-none px-0  py-0' state={{data:props.data,user:props.user}}  to={"/Home/product/"+props.id}><div className='  gap-x-44  rounded-2xl hover:scale-y-110 hover:scale-x-105 ease-in-out border-2 border-gray-500 flex  flex-col my-3   max-w-full min-w-0 h-full mt-3 col-span-1 pb-3 bg-zinc-50'>
    
    <div className="pt-2"><img src={props.data.image} className="border-2 hover:animate-pulse p-1 mx-auto my-1 h-36 w-36 border-stone-900" alt="product"/></div>
    <h2 className=' ml-2 font-bold'>₹ {props.data.price}/day</h2>
    <h2 className='ml-2 text-slate-500'> {props.data.name} </h2>
    <h2 className='ml-2 text-slate-500'> <span className='font-bold text-black'>Rent By : </span>{props.data.user} </h2>
    <h2 className='ml-2 text-slate-500'> <span className='font-bold text-black'>Available Until : </span>{props.data.endDate} </h2>
    <button onClick={handleClick} className=' hover:animate-wiggle p-1 bg-emerald-50 mx-auto hover:shadow-2xl mt-8 hover:font-bold hover:border-black'>Rent Now</button>
    </div></Link>
    
    
  )
}

export default Cards