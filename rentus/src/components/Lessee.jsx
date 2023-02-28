
import React from "react";
import {useState,useEffect} from "react";
import Axios from "axios";
import LessorCards from "./LessorCards";



function Lessee() {
  const [items,setItems]=useState([]);
 
  //getting the product
  useEffect( () => {
    const fetchData =  async () => {
   await Axios.post ("http://localhost:3001/getProduct",{request_by:localStorage.getItem("user"),status:"2"}).then((response)=>{
  //  const itms=response.data;
   console.log("Response",response.data);
  const itms=response?.data;
    setItems(itms);
   console.log("Items",items)
  })
    }
    fetchData();
    }, [])

  return (
    <div className="bg-rose-200  h-full mt-10  mx-4 grid-cols-4    py-7 px-8">
  {(items.length!=0)?(<div className=" mx-auto items-center flex justify-center ">
  <h1 className="font-bold sm:text-4xl text-2xl my-auto  ">Your Borrowed Items !</h1>
  </div>
  ):(<div className=" mx-auto items-center flex justify-center ">
  <h1 className="font-bold sm:text-4xl text-2xl my-auto ">You Have No Borrwed Items !</h1>
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
