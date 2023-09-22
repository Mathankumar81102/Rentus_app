
import React from "react";
import {useState,useEffect,useRef} from "react";
import Axios from "axios";
import LessorCards from "./LessorCards";
import { lesseeempty } from "../assets";
import { useQuery } from "react-query";

function Lessee() {
  const [items,setItems]=useState([]);
  const countRef = useRef(0)

  
  //getting the product
  
  // useEffect( () => {
  //   const fetchData =  async () => {
  //  await Axios.post ("http://localhost:3001/getProduct",{request_by:localStorage.getItem("user"),status:"2"}).then((response)=>{
  // //  const itms=response.data;
  //  console.log("Response",response.data);
  // const itms=response?.data;
  //   setItems(itms);
  //  console.log("Items",items)
  // })
  //   }
  //   fetchData();
  //   }, [])

    const { isLoading, error, data,isFetching } = useQuery('lesseeproducts', () =>{
    countRef.current += 1
   return (Axios.post('http://localhost:3001/getProduct',{request_by:localStorage.getItem("user"),status:"2"}).then((response) => {
   
    console.log("Response",response.data);
    const itms=response?.data;
      setItems(itms);
     console.log("Items",items) 
   }))}
  ,{
  refetchOnMount:'always',
  refetchOnWindowFocus:true,
  refetchInterval:() => countRef.current < 3 ? 2000 : false  
  });



  return (
    <div className="bg-rose-200  h-full mt-10  mx-4 grid-cols-4  pb-36  py-7 px-8">
  {(items.length!=0)?(<div className=" mx-auto items-center flex justify-center ">
  <h1 className="font-bold sm:text-4xl text-2xl  my-auto mb-10 mt-4 ">Your Borrowed Items !</h1>
  </div>
  ):(<div className=" mx-auto items-center flex justify-center py-14 ">
  <div className="rounded-2xl hover:scale-y-110 hover:scale-x-105 ease-in-out border-2 border-gray-500 flex  flex-col my-3   max-w-full min-w-0 h-full mt-3  pb-3 bg-zinc-50">
    <div className="p-2"><img src={lesseeempty} className="border-2 hover:animate-pulse p-1 mx-auto my-1 w-72" alt="product"/></div>
    {(isLoading || isFetching)?(<div className="font-bold text-2xl animate-bounce text-center ">Loading products . . .</div>)
    :(<div>
      <div className="font-bold text-2xl text-center ">No Product Available !!</div>
      <div className="font-light mt-2 text-xl text-center ">Get Some Product for Rent</div>

    </div>)}
    
      </div>
  </div>)}
  {
  items.map((itms,index)=>{
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
            const rem_Date=datediff(parseDate(fullDate), parseDate(itms.endDate));
  
  if(rem_Date!=0){
  return <LessorCards key={index} data={itms} from={"Lessee"}/>}}
  )}
  </div>
  );
}

export default Lessee;
