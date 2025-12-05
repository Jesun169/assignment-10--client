import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <Link to="/">
          <span className="text-2xl font-bold">
            SERVICE<span className="text-3xl text-blue-500">X</span>
          </span>
        </Link>
          <p className="text-gray-400">
            Reliable Home Services <br /> At Your Doorstep
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact Us</h4>
          <p>Email: servicex@gmail.com</p>
          <p>Phone: 01712345678</p>
          <p>Address: 123 Main St, Gulshan,<br /> Dhaka, Bangladesh</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex space-x-5 text-2xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white">
              <FaXTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} ServiceX — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
