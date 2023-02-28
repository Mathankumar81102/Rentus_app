import React from 'react'
import { Navbar, Hero, Footer } from "../components";
import { logo, ps, drill, spanner, cycle, surf } from "../assets/index"
import { useLocation } from 'react-router-dom'
import {useParams} from "react-router-dom";
import styles from "../style";


function SingleProduct(props) {
const {param}=useParams()
//can access data which is sent through <link>
const location = useLocation()
  const { data} = location?.state
  

  return (
    <div>
    <div div className="bg-teal-100 w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      </div>
      <div  className="bg-violet-200 overflow-clip  px-6 py-2   grid  h-full mt-10 mx-4 grid-cols-1 sm:grid-cols-1   grid-rows-2 md:grid-cols-1">
      <div className='flex  justify-center scale-75'><img className='m-auto h-80 w-90 flex justify-center row-start-2 border-2 bg rounded-3xl ' src={data.image}></img></div>
      <div className='bg-white mx-auto rounded-3xl px-11 flex flex-row  items-center justify-center row-span-2 row-start-2'>

<div><h2 className='ml-2 text-slate-500'>  <span className='font-bold text-black'> Owner Name: </span> {data.user} </h2>
    <h2 className=' ml-2 '> <span className='font-bold text-black'>₹ Price: </span> {data.price}</h2>
    <h2 className='ml-2 text-slate-500'> <span className='font-bold text-black'>Product Name: </span> {data.name} </h2>
    <h2 className='ml-2 text-slate-500'><span className='font-bold text-black'>Available From </span> {data.startDate} </h2>
    <h2 className='ml-2 text-slate-500'> <span className='font-bold text-black'>Available Until : </span>{data.endDate} </h2>
    <h2 className='ml-2 text-slate-500'> <span className='font-bold text-black'>Address: </span>{data.address} </h2>
    <h2 className='ml-2 text-slate-500'>  <span className='font-bold text-black'>Description: </span>{data.description} </h2>
    <button className=' cursor-progress hover:animate-pulse flex mx-auto mt-7 hover:font-bold hover:border-black py-2 px-2'>Rent Now</button>
   </div>
      
      </div>
     
      </div>
      <Footer/>
   
    </div>  
)
}

export default SingleProduct