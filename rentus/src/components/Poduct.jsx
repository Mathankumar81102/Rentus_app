import React from "react";
import Cards from "./Cards";
import {useState,useEffect} from "react";
import {useLocation} from 'react-router-dom';
import Axios from "axios";
import { useQuery } from "react-query";
import { emptycart } from "../assets";
function Poduct(props) {
  const {state}=useLocation();
  const user_name=state?.username;
 const [items,setItems]=useState([]);
 const [number,setNumber]=useState(0);
 
  // useEffect(() => {
  //   const fetchData = async () => {
  //  await Axios.post("http://localhost:3001/getProduct",{status:"0"}).then((response)=>{
   
  //  const itms=response?.data;
  //  setItems(itms)  
  // })
  //   }
  //   fetchData()
  //   }, [])

    const { isLoading, error, data,isFetching } = useQuery('gettingproducts', () =>
    Axios.post('http://localhost:3001/getProduct',{status:"0"}).then((response) => {
   
    const itms=response?.data;
    setItems(itms)  
   })
  , []);

  return (
    <div className= {"bg-sky-200 overflow-clip px-6 py-16  h-full mt-10 mx-4  grid-cols-1 gap-7 grid  "+ (isLoading || number==0 ?'sm:grid-cols-1 md:grid-cols-3':'sm:grid-cols-2  md:grid-cols-4')}>
    
    
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
      
      if(val.user!=localStorage.getItem("user") && val.req_by=="None" && rem_Date!=0){
   return(<Cards key={index} data={val} items={items} setNumber={setNumber} id={index}/>);
    }
    }
    )
    }
    {console.log(number)}

   {(number==0)&&(
   
    <div className={" rounded-2xl  border-2 border-gray-500 flex  flex-col my-3   max-w-full min-w-0 h-full mt-3 col-span-1 py-8 md:col-span-1 md:col-start-2   pb-6  bg-zinc-50  "  }>
    <div className="p-2"><img src={emptycart} className=" hover:animate-pulse p-1 mx-auto my-1 " alt="product"/></div>
    {(isLoading || isFetching)?<div className="font-bold text-2xl py-2 animate-bounce text-center">Loading Products . . .</div>:<div>

    <div className="font-bold text-2xl py-2 text-center ">No Product Available !!</div>
      <div className="font-light mt-2 py-2 text-xl text-center ">Try Again Later</div>
    </div>}

      </div>)}
    
    </div>
  );
}

export default Poduct;
