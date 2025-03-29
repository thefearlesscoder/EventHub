import React from "react";
import Logo from "../../src/assets/logo.jpg";
import vivek from "../../src/assets/Images/vivek.jpeg";
import kunal from "../../src/assets/Images/kunal.jpeg";
import varun from "../../src/assets/Images/varun.png";

import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";

const AboutUs = () => {
  return (
    <div className="w-[11/12] flex flex-col justify-center items-center">
      <div className="w-full flex md:flex-row flex-col items-center min-h-[600px] py-3 px-10 gap-4">
        <div className="md:w-[50%] w-full px-5 flex justify-center">
          <img src={Logo} className="w-[40%] rounded-full" alt="LOGO" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-5 w-[70%] gap-3 md:m-0 mt-3 mb-3">
          <h1 className="text-black leading-10 md:text-7xl text-4xl font-bold md:text-auto text-center">
            Music Mate
          </h1>
          <div className="bg-richblack-300 h-2 w-[20%] mx-auto my-4 rounded-md"></div>
          <p className="text-richblack-900 text-2xl md:text text-center">
            MusicMate is a platform designed for music lovers to connect with
            others who share similar musical interests before attending
            concerts. By helping users find like-minded individuals, MusicMate
            makes concert experiences more social and enjoyable, allowing fans
            to meet up and bond over their favorite artists and genres.
          </p>
        </div>
      </div>

      <div className=" w-full md:mt mt-5">
        <div className="pb-5 flex flex-col gap-3 items-center">
          <h1 className="text-black font-bold leading-10 text-5xl">Our Team</h1>
          <div className="bg-richblack-300 h-2 w-[20%] mx-auto my-4 rounded-md"></div>
        </div>
        <div className="grid md:grid-cols-3 mx-auto px-1 gap-10 grid-row-3 mb-4 ">
          <div className="flex flex-col items-center w-full">
            <img
              src={kunal}
              className="h-36 rounded-full object-cover"
              alt="Kunal"
            />
            <div className="flex flex-col justify-center items-center space-y-1 leading-5 text-sm font-semibold text-richblack-600 mt-2">
              <span className="hover:text-black transition-all duration-200">
                Kunal
              </span>
              <span className="hover:text-black transition-all duration-200">
                CSE
              </span>
              <div className="flex space-x-3">
                <FiGithub className="w-[20px] h-[20px] hover:text-black transition-all duration-200 cursor-pointer" />
                <CiLinkedin className="w-[25px] h-[25px] hover:text-black transition-all duration-200 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={varun}
              className="w-32 h-32 rounded-full object-cover"
              alt="Varun"
            />
            <div className="flex flex-col justify-center items-center space-y-1 leading-5 text-sm font-semibold text-richblack-600 mt-2">
              <span className="hover:text-black transition-all duration-200">
                Varun Kumar Sahu
              </span>
              <span className="hover:text-black transition-all duration-200">
                CSE
              </span>
              <div className="flex space-x-3">
                <FiGithub className="w-[20px] h-[20px] hover:text-black transition-all duration-200 cursor-pointer" />
                <CiLinkedin className="w-[25px] h-[25px] hover:text-black transition-all duration-200 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={vivek}
              className="w-32 h-32 rounded-full object-cover"
              alt="Vivek"
            />
            <div className="flex flex-col justify-center items-center space-y-1 leading-5 text-sm font-semibold text-richblack-600 mt-2">
              <span className="hover:text-black transition-all duration-200">
                Vivek Kumar
              </span>
              <span className="hover:text-black transition-all duration-200">
                CSE
              </span>
              <div className="flex space-x-3">
                <FiGithub className="w-[20px] h-[20px] hover:text-black transition-all duration-200 cursor-pointer" />
                <CiLinkedin className="w-[25px] h-[25px] hover:text-black transition-all duration-200 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
