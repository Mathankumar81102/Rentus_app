import React from "react";
import { useState } from "react";
import Product from "./Poduct";
import Lessor from "./Lessor";
import Lessee from "./Lessee";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Typed from "react-typed";

const hero = (props) => {
  const name=props?.username;

  return (
    <div>
      {/* <Typed strings={["still buying product","time to change","start renting the product"]} typeSpeed={50} backspeed={50} /> */}

      <div className="flex  flex-row mt-3 px-5  justify-between max-w-[500px] m-auto">
        <NavLink
          to={{pathname:"/Home/product",state:{username:name}}}

          className="rounded-sm hover:rounded-3xl hover:bg-sky-400  p-4 text-xl font-bold bg-sky-200 "
        >
          
          PRODUCTS
        </NavLink>
        <NavLink
          to={{pathname:"/Home/lessor",state:{username:name}}}
          className=" hover:bg-lime-400 hover:rounded-3xl bg-lime-200 p-4 text-xl font-bold"
        >
          LESSOR
        </NavLink>
        <NavLink
          to={{pathname:"/Home/lessee",state:{username:name}}}
          className=" hover:bg-rose-400 hover:rounded-3xl bg-rose-200 p-4 text-xl font-bold"
        >
          LESSEE
        </NavLink>
      </div>
      <div>
       <Outlet/>
      </div>
    </div>
  );
};

export default hero;
