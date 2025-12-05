import React from 'react';
import NavBar from '../../Components/Header/NavBar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-[80vh] flex flex-col justify-center items-center text-black mt-10 px-4">
        <div className='flex justify-center mt-5'>
          <img className='w-full h-auto' src="/src/assets/404_page_cover.jpg" alt="Error Illustration" />
        </div>
        <p className='mt-5 text-gray-600'>The page you are looking for is not available.</p>
        <Link to="/">
          <button className='mt-10 btn bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded'>
            Go Back
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;