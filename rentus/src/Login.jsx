import React from 'react';
import {useState} from "react";
import { useNavigate} from "react-router-dom";
import App from "./App"
import { logo } from "./assets";
import Axios from "axios";




const Login =() => { 
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();
    const [login,setLogin]=useState(false);
  
  //Aunthentication
    const handleClick=  (e) => {
        e.preventDefault();
        if(login){
        Axios.post("http://localhost:3001/login",{username:username,password:password}).then((response)=>
        {
            if(response.data.status=="1"){
            localStorage.setItem("user" ,response.data.user);

            alert("User Logged In");
            navigate("/Home",{state:{username}});
            }
            else{
            alert(response.data);
            }
    
    }
    ).catch((err)=>{console.log(err,"Error has occured")})
    }
        
    
    else{
        Axios.post("http://localhost:3001/register",{username:username,email:email,password:password},{ withCredentials: true })
        .then((response)=>
        {
            if(response.data=="User Already exists"){
            alert("Username already exists ...")
            }
            else{
            alert("User Registered Successfully. LOGIN NOW");

        }
        
        
        }).catch((err)=>{console.log(err,"Error has occured")});
    
    }
    setUsername("");setEmail("");setPassword("");   


        // navigate("/Home");
    }

    //   @ # $ % ^ & *
    return (
    <div className ="relative h-96  w-full bg-green-300 md:grid md:grid-cols-2 grid grid-rows-2 md:grid-rows-none md:justify-center flow justify-center items-center  min-h-screen overflow-hidden">
        {/*logo*/}
    <div className='flex justify-center  sm:justify-center mb-16 md:mb-0 sm:items-center relative  items-center'>
    <div className=' flow justify-center items-center'>
        <img src={logo} alt="logo" className='  w-72'/>
        <h1 className=' text-4xl font-bold '>Happy <span className='text-white'>RENT</span>ing :)</h1>
    </div>
    </div>
    {/*login form*/}
    <div className={" px-16 py-10 mx-9 md:px-10 md:py-12  lg:py-16 mb-28 sm:mb-28 md:mb-0 md:scale-110 lg:w-auto  bg-white rounded-md shadow-2xl  md:max-w-md ss:max-w-ss lg:max-w-lg"}>
       <div className='grid grid-cols-3 sm:space-x-5 space-x-7  '>
       <h1 className="sm:text-3xl  sm:col-span-2 text-xl col-span-1   font-semibold text-center text-purple-700 underline">
            {login?"Login":"Register"}        
    </h1>
    <button onClick={()=>{setLogin(!login)}} className='text-purple-700 sm:col-start-3 col-start-2 col-end-4 sm:scale-100 scale-75 font-bold hover:scale-y-110 hover:scale-x-110 hover:border-2  sm:text-xl w-full   hover:bg-violet-700 hover:text-white'>{!login?"Login":"Register"}
    </button>
    
    </div> 
        <form className="mt-6 ">
        <div className="mb-2 " >
                
                <input
                placeholder="Username"
                value={username}
                    type="text"
                    name="username"
                    onChange={(e)=>{setUsername(e.target.value)}}
                    className="block w-full px-4 py-2 my-7 mt-10 text-purple-700 bg-white border rounded-md focus:border-purple-400  focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className={"mb-2 "+(!login?"block":"hidden")} >
                
                <input
                placeholder="Email"
                value={email}
                    type="email"
                    name="email"   onChange={(e)=>{setEmail(e.target.value)}}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 my-7 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <input
                    placeholder="Password"
                    value={password}
                    type="password"
                    name="password" onChange={(e)=>{setPassword(e.target.value)}}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            
            <div className="mt-6">
                {/* <Link to="/app"> */}
                    <button  className="w-full px-4 py-3 font-bold text-2xl  mt-4 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-600" onClick={handleClick} >
                    {login?"Login":"Register"}
                    </button>
                {/* </Link> */}
            </div>
        </form>

    </div>
</div>

)

}
export default Login;