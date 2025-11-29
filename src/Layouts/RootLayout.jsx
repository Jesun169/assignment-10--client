import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/Header/NavBar';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <div className='max-w-6xl mx-auto'><NavBar></NavBar></div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;