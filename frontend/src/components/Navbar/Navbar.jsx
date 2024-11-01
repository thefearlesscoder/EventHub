import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-richblack-100 rounded-sm">
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <div className="text-blue-500 font-bold text-lg hover:scale-125 transition-all duration-200 cursor-pointer">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-[3rem] rounded-full" />
            </Link>
          </div>
        </div>

        {/* Desktop Links (hidden on small screens) */}
        <div className="hidden sm:flex items-center space-x-4">
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

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
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
            <Link to="/login">
              <button className="flex items-center justify-center w-[5rem] h-[2rem] py-1 px-3 bg-richblue-500 hover:bg-richblue-300 rounded-md text-gray-400 hover:text-white font-bold">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="flex items-center justify-center w-[5rem] h-[2rem] py-1 px-3 bg-richblue-500 hover:bg-richblue-300 rounded-md text-gray-400 hover:text-white font-bold">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Menu Button (visible on small screens) */}
        {!isMenuOpen && (
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white font-extrabold text-xl p-2 border-2 rounded-md border-blue-700 
               focus:outline-none hover:scale-105 transition-all duration-200"
            >
              ☰
            </button>
          </div>
        )}
      </nav>

      {/* Side Menu for Mobile */}
      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex flex-col items-center justify-center">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✕
          </button>
          <Link
            to="/"
            onClick={toggleMenu}
            className="text-white text-xl mb-4 hover:scale-105 transition-all duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/find-concerts"
            onClick={toggleMenu}
            className="text-white text-xl mb-4 hover:scale-105 transition-all duration-200"
          >
            Find Concerts
          </Link>
          <Link
            to="/find-places"
            onClick={toggleMenu}
            className="text-white text-xl mb-4 hover:scale-105 transition-all duration-200"
          >
            Find Places
          </Link>
          <Link
            to="/login"
            onClick={toggleMenu}
            className="text-white text-xl mb-4 hover:scale-105 transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={toggleMenu}
            className="text-white text-xl mb-4 hover:scale-105 transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
