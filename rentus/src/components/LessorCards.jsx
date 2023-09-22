import React from 'react'
import { useNavigate  } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Axios from "axios";
import {useState,useEffect} from "react";
import {MdDelete} from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cards(props) {
    const [isProductAvailable,setAvailable]=useState(1);
  async function  deletepdt(e){
    e.preventDefault();
    const value=confirm("Are You Sure to Delete this Product ?"); 
    if(value==1){
      try{
        await Axios.post ("http://localhost:3001/deleteProduct",{pdt_name:props.data.name,user_name:props.data.user})
   .then((response)=>{
    //  const itm=response.data;
    //  items.push(itm);
   
    alert("Product Successfully Deleted");
   
   }).catch(()=>{alert("Failed to Delete")} );
   
  }
  catch(err){
    console.log(err,"Error in post Axios");
  }
  setAvailable(0);
}

  }




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

if(rem_Date<=0){
  async function  deletepdt(){
    try{
     await Axios.post ("http://localhost:3001/deleteProduct",{pdt_name:props.data.name,user_name:props.data.user})
   .then((response)=>{
    //  const itm=response.data;
    //  items.push(itm);
   
   
   }).catch(()=>{} );
   
   }
   catch(err){
   console.log(err,"Error in post Axios");
   }
  }
  deletepdt();  
  return ;
}


return (
    
    //Use useNavigate instead of link so that the component can be called along with its property
    <div className='border-none rounded-none px-0  py-0'> 
    <ToastContainer position="top-right" />

    {/**sm:h-full h-80 */}
    {(isProductAvailable==1)&&(<div className={'  gap-x-6 h-full  hover:scale-x-105 hover:scale-y-105  rounded-2xl sm:mt-10  ease-in-out border-2 border-gray-500 grid  grid-cols-4 my-3 shadow-2xl sm:max-w-[90%] sm:mx-auto  p-2 pb-3 '+((props.data.req_by!="None" && props.from=="Lessor")?'bg-orange-100':(props.from=="Lessor")?'bg-fuchsia-100':'bg-emerald-50 py-8 pb-10 mt-10')}>
    
    <div className="pt-2 col-span-2 space-y-24 ml-3 sm:ml-0 sm:my-auto sm:mx-auto flex-col items-center justify-center">
    <img src={props.data.image} className={"border-2  sm:ml-6  lg:left-36 sm:h-48 relative sm:mt-0 mt-4 h-32 border-stone-900 "} alt="product"/>
    {(props.from=="Lessor" && props.data.req_by!="None")&&<button onClick={deletepdt} className='flex bg-teal-500  sm:mt-5 hover:scale-x-105 hover:scale-y-105 sm:hidden font-bold sm:text-xl justify-center text-white'>Item Returned</button>}
    {(props.from=="Lessor" && props.data.req_by=="None")&&<button onClick={deletepdt} className=' sm:mt-7 space-x-1 bg-red-600 hover:scale-x-105 sm:hidden hover:scale-y-105 font-bold  justify-center text-white  
     flex  '> Delete Product</button>}

    </div>
    <div className='col-start-3 md:-ml-10 sm:text-xl sm:overflow-visible overflow-auto text-xs my-auto col-span-2'> 
    {(props.data.req_by!="None" && props.from=="Lessor")&&<h2 className=' sm:text-2xl  text-lg font-bold text-red-600'>  Item Rented&nbsp;! </h2>} 
    <h2 className=' sm:text-xl font-bold text-lg font_3 text-gray-500 '><span className="font-bold font-sans text-black">Product  :</span>  {props.data.name} </h2> 
    <h2 className=' sm:text-xl font-bold font_3 text-gray-500 text-lg '><span className="font-bold sm:text-xl font-sans text-black ">Price&nbsp;:</span>&nbsp;₹{""+props.data.price}/day</h2>
    
    <h2 className='sm:text-xl font-bold text-lg font_3 text-gray-500'><span className="font-bold sm:text-xl font-sans text-black">Rented On  :</span>  {props.data.startDate} </h2> 
    
    
    {(props.data.req_by!="None" && props.from=="Lessor" )&&<h2 className='sm:text-xl font_3 text-gray-500 text-lg sm:overflow-hidden overflow:scroll font-bold '><span className="font-bold font-sans text-black">Rented To  :  </span>
    {props.data.req_by.substring(0,1).toUpperCase()+props.data.req_by.substring(1)}</h2>}
    
    {(props.data.req_by!="None" && props.from=="Lessee" )&&<h2 className='sm:text-xl text-lg font-bold font_3 text-gray-500 '><span className="font-bold font-sans text-black">Rented From  :  </span>
    {props.data.user.substring(0,1).toUpperCase()+props.data.user.substring(1)}</h2>}
    
    <h2 className='sm:text-xl font-bold text-lg  font_3 text-gray-500'><span className="font-bold font-sans text-black"> Due  Date  : </span>    {props.data.endDate}</h2>
    <h2 className='sm:text-2xl font-bold text-lg   text-black'><span className="font-bold sm:text-xl text-black"></span> {rem_Date} days Left</h2>
    
    {(props.from=="Lessor" && props.data.req_by!="None")&&<button onClick={deletepdt} className='sm:flex bg-teal-500 hidden shadow-2xl sm:mt-5 hover:scale-x-105 hover:scale-y-105 font-bold sm:text-xl h-10   justify-center text-white'>Item Returned</button>}

    {(props.from=="Lessor" && props.data.req_by=="None")&&
    <button  onClick={deletepdt} className=' sm:mt-7 space-x-1 shadow-2xl bg-red-600 hover:scale-x-105 hover:scale-y-105   font-bold text-xl sm:justify-center text-white  
     sm:flex hidden h-12 '><div className=''>Delete Product</div><div className="text-gray-200"> <MdDelete size={28}/></div></button>}
    </div>
     


    </div>)
    }</div>
    
    
  )
}

export default Cards