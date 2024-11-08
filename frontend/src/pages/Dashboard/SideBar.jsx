import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="wrapper">
      <div className={`w-[11/12] h-screen flex flex-col ${isOpen} ? flex flex-col`}>
        <div>
          {/* Toggle Button for Small Screens */}
          <button
            onClick={toggleSidebar}
            className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-md text-white"
          >
            {!isOpen ? (
              <FaBars size={24} className="text-black" />
            ) : (
              <RxCross1 size={24} className="text-black" />
            )}
          </button>
        </div>

        <div
          className={`bg-gray-900 text-white w-64 h-screen p-5 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <nav className="flex flex-col space-y-4 justify-between items-center py-3 px-2  ">
            <div className=" text-richblack-900 text-xl font-bold border-2 border-spacing-2 border-slate-300 rounded-md hover:bg-black hover:text-richblack-300">
              <Link className="p-2">My friends</Link>
            </div>
            <div className="text-richblack-900 text-xl font-bold border-2 border-spacing-2 border-slate-300 rounded-md hover:bg-black hover:text-richblack-300">
              <Link className="p-2">Concerts</Link>
            </div>
            <div className="text-richblack-900 text-xl font-bold border-2 border-spacing-2 border-slate-300 rounded-md hover:bg-black hover:text-richblack-300">
              <Link className="p-2">My Friends</Link>
            </div>
            <div className="text-richblack-900 text-xl font-bold border-2 border-spacing-2 border-slate-300 rounded-md hover:bg-black hover:text-richblack-300">
              <Link className="p-2">Requested</Link>
            </div>
            <div className="text-richblack-900 text-xl font-bold border-2 border-spacing-2 border-slate-300 rounded-md hover:bg-black hover:text-richblack-300">
              <Link className="p-2">Requests</Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
