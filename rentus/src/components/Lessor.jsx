import React from "react";
import rating from "../assets/rating.png"
import {useState,useEffect} from "react";
import { TiDelete } from 'react-icons/ti';
import {IoIosAddCircleOutline} from 'react-icons/io';
import Axios from "axios";
import FileBase64 from 'react-file-base64';
import Cards from "./LessorCards";
import { loading } from "../assets";
import { useQuery } from "react-query"


function Lessor() {
  const [form,setForm]=useState(true);
  const [item,setItem]=useState({user:"",name:"",price:Number(""),startDate:"",endDate:"",address:"",description:"",image:"",req_by:""})
  const [items,setItems]=useState([]);
  
  
 
  //getting the product

  // useEffect( () => {
  //   const fetchData =  async () => {
  //  await Axios.post ("http://localhost:3001/getProduct",{username:localStorage.getItem("user"),status:"1"}).then((response)=>{
  // //  const itms=response.data;
  // const itms=response?.data;
  //   setItems(itms);
  // })
  //   }
  //   fetchData();
  //   }, [])

    const {isLoading,isFetching,isError,error,}=useQuery(['lessorproducts'],() => {
     return  Axios.post ("http://localhost:3001/getProduct",{username:localStorage.getItem("user"),status:"1"}).then((response)=>{
     //  const itms=response.data;
     const itms=response?.data;
       setItems(itms);
     })
       }
       ,{
      refetchOnMount:'always',
      refetchOnWindowFocus:true,
      cacheTime:300000
      })



function handleForm (){
    
setForm(!form);
}

async function handleClick(e){
  
  e.preventDefault();
  const value=confirm("Are You Sure to Rent this Product ?"); 
  // console.log("Class value",document.getElementsByClassName("").value);
 if(value==1){
  
  const owner=localStorage.getItem("user");

  // setItem({user:"username",...item});


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
            const rem_Date=datediff(parseDate(fullDate), parseDate(item.endDate));
            
            if(rem_Date<=0)
            {alert("Enter the correct date");}
            
            else{setItem({...item,startDate:fullDate,user:owner,req_by:"None"});
            setItem(async (item)=>{
              try{
                await Axios.post ("http://localhost:3001/addProduct",item)
                .then((response)=>{
                  const itm=response.data;
                  setItems((itms)=>[...itms,itm])   
                  alert("Product Posted for Rent");
                  
                }).catch(()=>{alert("Failed to Post")} );
                
              }
              catch(err){
                console.log(err,"Error in post Axios");
              }
            })}
            // setCounter(counter+1);
            
            //user name from local storagex
            setItem({user:"",name:"",price:Number(""),startDate:"",endDate:"",address:"",description:"",image:"",req_by:""})
            
          }
        }

  return (
    <div className="bg-lime-200  h-full  py-7 sm:px-8 px-4 mt-10 mx-4 ">
      <div className=" w-full flex items-center justify-between ">
      <h1 className="font-bold sm:text-4xl text-2xl mt-4 ml-4 "> Your Rented Items !</h1>
     {(isLoading) && (<h1 className="sm:w-[20%] w-24 h-12 animate-bounce sm:h-auto flex justify-around items-center text-xl font-bold sm:text-2xl md:text-3xl mt-4 ml-4">Loading&nbsp;.&nbsp;.&nbsp;.</h1>)}
      </div>
      
      {/* Creating the form to add products */}
      <div className="min-h-[40rem] mt-11 flex justify-center">
      <div className={"  h-full lg:max-w-[40%] sm:px-16 sm:py-16 px-4 py-4  bg-white mt-16 mb-11 ease-in-out  "+(!form&&"hidden")}>
      <form className="grid  grid-cols-2 gap-y-3 ">
      
      <label className="sm:font-semibold font-bold sm:text-xl text-sm  text-slate-600" for="productname"> Name of the product </label>
        <input type="text" value={item.name} onChange={
        (e)=>
        {setItem(
        {...item,name:e.target.value});
        }} name="productname" className="px-3 py-1 rounded-md border-2  border-green-600 relative  sm:ml-4" /> 
        <label className="sm:font-semibold font-bold sm:text-xl text-sm  text-slate-600" for="price"> Price </label>
        <input type="text" value={(item.price==0)?(""):item.price} onChange={(e)=>{setItem({...item,price:e.target.value})}} name="price" className="px-3 py-1 rounded-md  border-2 border-green-600 relative  sm:ml-4" /> 
        <label className="sm:font-semibold font-bold sm:text-xl text-sm  text-slate-600" for="enddate"> Available Till </label>
        <input type="date" min={new Date().getDate()} value={item.endDate} onChange={(e)=>{
        
        setItem({...item,endDate:e.target.value})
        ;}
        } name="enddate" className="px-3 py-1 rounded-md border-2  border-green-600 relative  sm:ml-4" /> 
        

<label className="sm:font-semibold sm:text-xl text-sm  font-bold text-slate-600" for="productname"> Description </label>
        <textarea value={item.description} onChange={(e)=>{setItem({...item,description:e.target.value})}} name="productname" className="px-3 py-1 rounded-md border-2  border-green-600 relative  sm:ml-4" />

        <label className="sm:font-semibold sm:text-xl text-sm  font-bold text-slate-600" for="productname"> Your Address </label>
        <textarea value={item.address} onChange={(e)=>{setItem({...item,address:e.target.value})}} name="productname" className="px-3 py-1 rounded-md border-2 border-green-600  relative  sm:ml-4" />
      
        <label className="sm:font-semibold sm:block hidden sm:text-xl text-sm font-bold cursor-pointer text-slate-600" for="image"> Add Image 
        </label>

  <div className="ml-4 sm:block hidden ">        
  <FileBase64  type="file"  name="image" className="sm:ml-4 w-96 " multiple={false} 
        onDone={({ base64 }) => setItem({ ...item, image: base64 })} />
     </div>

        <div className="flex sm:hidden flex-col col-span-2 space-x-7 space-y-2"><div className="flex text-slate-600 font-bold justify-center"><h3>Add Image : </h3></div><div className="flex justify-center">
        
        <FileBase64  type="file"  name="image" className="sm:ml-4 w-96 " multiple={false} 
        onDone={({ base64 }) => setItem({ ...item, image: base64 })} /></div>
        
        </div>
      <button onClick={handleClick} className="bg-lime-200 font-bold mt-7 hover:bg-green-300 hover:shadow-2xl hover:scale-105 h-12 col-span-2 mx-auto sm:w-1/3 border-2">SUBMIT</button>
      </form>
      </div>
      </div>

      {/* Displaying the items rent */}
          {  
          items.map(function(pdt,index){

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
            const rem_Date=datediff(parseDate(fullDate), parseDate(pdt.endDate));
          
              return (<Cards key={index} data={pdt} from={"Lessor"} />);
          })
        
        }


    </div>
  );
}

export default Lessor;
