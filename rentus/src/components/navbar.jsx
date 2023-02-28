import { useState } from "react";
import {  logo} from "../assets";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate} from "react-router-dom";
import {BsFillPersonFill} from "react-icons/bs"


const navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();


  const logouthandle=()=>{
    const value=confirm("Are You Sure to get this Product ?"); 
    if(value==true){
  localStorage.removeItem("user");
  navigate("/")
}
}

  const handleNav = () => {
    setNav(!nav);
  };
  console.log(localStorage.getItem("user"));
  return (
    
    <nav className="grid grid-cols-5  items-center justify-between md:h-20 sm:h-28 h-28">
      <div className=" sm:ml-24 sm:w-auto xs:w-auto w-24 ml-4 xs:ml-6">
        <Link to="/Home"><img src={logo} alt="logo" className="xs:h-[3rem] h-[3.5rem] xs:w-auto" /></Link>
        
      </div>
     
      
      {/* <div className="flex  flex-row space-x-1.5  "> */}
        <div className="bg-sky-200 flex sm:col-start-4 col-start-3 sm:text-base xs:w-auto xs:text-base text-sm  justify-start space-x-2 items-center rounded-xl mx-auto px-5 py-1 text-stone-900">
        <div>{<BsFillPersonFill size={25} className="xs:w-auto w-4"/>}</div>
        <div>{localStorage.getItem("user")}</div>
        </div>
       
        <button onClick={logouthandle}
          className=" bg-black col-start-5 text-white px-4 hidden relative xs:mx-auto    py-2 sm:flex rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          LogOut
        </button>
        <div onClick={handleNav} className="sm:hidden mx-auto col-start-5">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={30} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[30%] h-full md:hidden border-r-black-600  bg-gray-600 ease-in-out duration-500 "
              : "fixed left-[-100%]"
          }
        >
          <ul className="uppercase p-4 flex flex-col">
            <li className="p-4  border-b border-black-600">Home </li>
            <li className="p-4 border-b border-black-600">Your orders</li>
            <li className="p-4 border-b border-black-600"> Your Payements</li>
            <li className="p-4 border-b border-black-600">about us</li>
          </ul>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default navbar;
