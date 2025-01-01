import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Banner } from './Banner'
import { useState } from 'react';
import {WebsiteContext, WebsiteProvider} from '../Contexts/WebsiteContext'
import { CartView } from '../CartView';
import LoadingSpinner from '../Componenets/Loading';


export const Layout = () => {
  // const {cartCount,toggleCartSide}  =useContext(WebsiteContext);
  
 
  return (
      <WebsiteProvider>
      <LayoutContent />
    </WebsiteProvider>
   
    
  )
}

const LayoutContent = () => {
  const { isCartSideOpen ,isLoading,changeIsLoading} = useContext(WebsiteContext);



  useEffect(() => {
    setTimeout(() => {
      changeIsLoading(false);
    }, 3000); // Simulate 3 seconds loading
  }, []);
  

  return (
    <div className='relative'>
      <Header />
      <Banner />
      <Outlet />


      {isCartSideOpen && <CartView />}

      {isLoading && <LoadingSpinner/>}
    </div>
  );
};
