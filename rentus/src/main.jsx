import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import "./index.css";
import Poduct from "./components/Poduct";
import Lessee from "./components/Lessee";
import Lessor from "./components/Lessor";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SingleProduct from "./components/SingleProduct"
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient=new QueryClient()
  
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="Home" element={<App />} >
          <Route index element={<Poduct />}/>
          <Route path="product" element={<Poduct />} />
          <Route path="Lessor" element={<Lessor />} />
          <Route path="Lessee" element={<Lessee />} />


      </Route>
      <Route path="Home/product/:param" element={<SingleProduct/>} 
      />
    </Routes>    
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
);
