import React from 'react';
import Navbar from './component/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './component/footer/Footer';


function Routes () {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
  );
}

export default Routes;
