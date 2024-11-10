import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import { Link, json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/auth";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { user } = useSelector( (state) => ( state.auth ))
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const dispatch = useDispatch () ;
  const navigate = useNavigate() ;
  function handleclick (){
    console.log("click") ;
    dispatch(logout(navigate)) ;
  }

  const click = () => {
    handleclick();
    toggleMenu();
  }

  user = JSON.parse(user) ;
  console.log(user)

  return (
    <div className="bg-richblack-5 rounded-sm">
      <nav className="bg-gray-900 text-white p-4 flex justify-around items-center">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <div className="text-blue-500 font-bold text-lg hover:scale-125 transition-all duration-200 cursor-pointer">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className=" md:w-[4rem] w-[2rem] rounded-full"
              />
            </Link>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex space-x-4 items-center"></div>

          <div className="flex items-center space-x-4">
                       
            {

              user && <div className="bg-richblue-500 py-2 rounded-md hover:bg-richblue-300 hover:scale-105">
                <a
                  href="/profile"
                  className="bg-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-600  
                  transition-all duration-200"
                >
                  Create Concert
                </a>
              </div>
            }
            
            {

              user && <div className="bg-richblue-500 py-2 rounded-md hover:bg-richblue-300 hover:scale-105">
                <a
                  href="/profile"
                  className="bg-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-600  
                  transition-all duration-200"
                  >
                    Profile
                  </a>
                </div>
              
            }

            {user && (
              <div className="bg-richblue-500 py-2 rounded-md hover:bg-richblue-300 hover:scale-105">
                <a
                  href="/dashboard"
                  className="bg-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-600  
                  transition-all duration-200"
                >
                  Dashboard
                </a>
              </div>
            )}
            {!user && (
              <Link to="/login">
                <button className="flex items-center justify-center w-[5rem] h-[2rem] py-1 px-3 bg-richblue-500 hover:bg-richblue-300 rounded-md text-gray-400 hover:text-white font-bold">
                  Login
                </button>
              </Link>
            )}
            {!user && (
              <Link to="/signup">
                <button className="flex items-center justify-center w-[5rem] h-[2rem] py-1 px-3 bg-richblue-500 hover:bg-richblue-300 rounded-md text-gray-400 hover:text-white font-bold">
                  Sign Up
                </button>
              </Link>
            )}
            {

              user && <button className="bg-richblue-500 py-2 rounded-md hover:bg-richblue-300 hover:scale-105" onClick={handleclick}>
              <p className="bg-gray-700 px-4 rounded-lg font-bold hover:bg-gray-600  
                  transition-all duration-200">
                    Logout
                  </p>
                </button>
            }
          </div>
        </div>


        {!isMenuOpen && (
          <div className="sm:hidden flex items-center ">
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


      {isMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-gray-900
           bg-opacity-50 z-50 flex flex-col items-center justify-center"
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-3xl"
          >
            ✕
          </button>

          {user && (
            <Link
              to="/"
              onClick={toggleMenu}
              className=" text-xl mb-4 hover:scale-105 transition-all duration-200 "
            >
              Dashboard
            </Link>
          )}
          {user && (
            <Link
              to="/find-concerts"
              onClick={toggleMenu}
              className=" text-xl mb-4 hover:scale-105 transition-all duration-200"
            >
              Find Concerts
            </Link>
          )}
          {/* {

          user && <Link
            to="/find-places"
            onClick={toggleMenu}
            className=" text-xl mb-4 hover:scale-105 transition-all duration-200"
          >
            Find Places
          </Link>
          } */}
          {!user && (
            <Link
              to="/login"
              onClick={toggleMenu}
              className=" text-xl mb-4 hover:scale-105 transition-all duration-200"
            >
              Login
            </Link>
          )}
          {!user && (
            <Link
              to="/signup"
              onClick={toggleMenu}
              className=" text-xl mb-4 hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </Link>
          )}
          {user && (
            <Link
              to="/"
              onClick={click}
              className=" text-xl mb-4 hover:scale-105 transition-all duration-200 "
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
