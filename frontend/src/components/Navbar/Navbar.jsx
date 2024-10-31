import React from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="bg-richblack-100 rounded-sm">
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        {/* Logo and Links */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="text-blue-500 font-bold text-lg hover:scale-125 transition-all duration-200 cursor pointer">
            {/* Replace with your SVG or logo component */}
            <Link to="/">
              <img src={logo} alt="" className="w-[3rem] rounded-full" />
            </Link>
          </div>
          {/* Nav Links */}
          <div className="flex space-x-4 items-center">
            <div className="bg-richblue-500 py-2 rounded-md hover:bg-richblue-300 hover:scale-105">
              <a
                href="#"
                className="bg-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-600  transition-all duration-200"
              >
                Dashboard
              </a>
            </div>
            <div className="bg-richblue-500 py-2 rounded-md hover:bg-richblue-300 hover:scale-105">
              <a
                href="#dashboard"
                className="bg-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-600  transition-all duration-200"
              >
                Find Concerts
              </a>
            </div>
            <div className="bg-richblue-500 py-2 rounded-md hover:bg-richblue-300 hover:scale-105">
              <a
                href="#dashboard"
                className="bg-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-600  transition-all duration-200"
              >
                Find Places
              </a>
            </div>
          </div>
        </div>

        {/* Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-sm px-4 py-2 rounded-lg focus:outline-none placeholder-gray-500"
            />
            <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
          </div>
          {/*Login / or logout based logged in status*/}
          <Link to="/login">
            <div
              className="flex items-center justify-center w-[5rem] h-[2rem] py-1 px-3 bg-richblue-500
            hover:bg-richblue-300 rounded-md"
            >
              <button className="text-gray-400 hover:text-white font-bold">
                Login
              </button>
            </div>
          </Link>
          {/* Profile Image  OR signUp button based on Login Status*/}
          <Link to="/signup">
            <div
              className="flex items-center justify-center w-[5rem] h-[2rem] py-1 px-3 bg-richblue-500
            hover:bg-richblue-300 rounded-md"
            >
              <button className="text-gray-400 hover:text-white font-bold">
                Sign Up
              </button>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
