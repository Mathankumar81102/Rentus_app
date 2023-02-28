import React from "react";
import Cards from "./Cards";
import {useState,useEffect} from "react";
import {useLocation} from 'react-router-dom';
import Axios from "axios";

function Poduct(props) {
  const {state}=useLocation();
  
  const user_name=state?.username;
 const [items,setItems]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
   await Axios.post("http://localhost:3001/getProduct",{status:"0"}).then((response)=>{
   
   const itms=response?.data;
   setItems(itms)  
  })
    }
    fetchData()
    }, [])

  return (
    <div className= "bg-sky-200 overflow-clip px-6 py-16 gap-7 grid   min-h-[140px] mt-10 mx-4  grid-cols-1 sm:grid-cols-2  md:grid-cols-4">
    
    
    {items.map(function(val,index){
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
            const rem_Date=datediff(parseDate(fullDate), parseDate(val.endDate));
  


    if(val.user!=localStorage.getItem("user") && val.req_by=="None" &&rem_Date!=0){
   return(<Cards key={index} data={val}  id={index}/>);
    }
    }
    )
    }
    
    

    </div>
  );
}

export default Poduct;
