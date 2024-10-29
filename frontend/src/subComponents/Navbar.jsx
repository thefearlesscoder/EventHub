import React from "react";
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <div>
      <nav class="w-full bg-deepBlue scroll overflow-x-hidden">
        <div class="relative w-[1080px] mx-auto flex items-center justify-between">
          <a href="/" class="cursor-pointer py-7 pr-7">
            <img src={logo} width="100px" height="30px" />
          </a>

          <ul class="flex space-x-6 ">
            <li
              class="text-black font-extrabold py-7 hover:text-lightBlue cursor-pointer
                transition-all duration-200 relative group"
            >
              <a href="#">Find Mates</a>
              <div
                class="absolute bottom-0 w-full h-1 bg-lightBlue500 hidden group-hover:block 
                transition-all duration-200"
              ></div>
            </li>

            <li
              class="text-black font-extrabold py-7 hover:text-lightBlue cursor-pointer
                transition-all duration-200 relative group"
            >
              <a href="#">Concerts Near Me</a>
              <div
                class="absolute bottom-0 w-full h-1 bg-lightBlue500 hidden group-hover:block 
                transition-all duration-200"
              ></div>
            </li>

            <li
              class="text-black font-extrabold py-7 hover:text-lightBlue cursor-pointer
                transition-all duration-200 relative group"
            >
              <a href="#">Explore Places</a>
              <div
                class="absolute bottom-0 w-full h-1 bg-lightBlue500 hidden group-hover:block 
                transition-all duration-200"
              ></div>
            </li>
          </ul>

          <div class="flex space-x-5">
            <img
              src="./resources/india-flag.svg"
              widht="28px"
              height="20px"
              alt=""
            />

            <button class="text-black py-3 px-5 font-semibold border-lightBlue border bg-gray-600 rounded-sm text-sm font-bold">
              Log in
            </button>

            <button
              class="py-3 px-4 font-mullish test-sm font-bold bg-gray-500 text-lightBlue300 border 
                transition-all duration-200 
                hover:text-lightBlue500"
            >
              Sign Up<i class="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
