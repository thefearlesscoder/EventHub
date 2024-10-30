import React from 'react'
import Logo from '../../assets/logo.jpg'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <div className='  w-full min-h-[150px] mt-3 bg-richblack-600 md:text-auto  text-richblack-25 md-gap gap-8 flex md:flex-row flex-col  md:justify-around 
    p-5 items-center  '>
        <div className='flex flex-col  gap-5 md:max-w-[25%] w-full ' >
                <Link to={'/'}>
            <div className=' w-full flex items-center text-xl font-bold text-richblack-25 gap-3 justify-center'>
                    <img src={Logo} className='md:w-[20%] w-[10%] rounded-full '></img>
                    Musicmate
            </div>
                </Link>
            <div className='font-semibold'>
                <p>
                    Created By Team codebase | 2024
                </p>
                <p>TeamId : 759 </p>
            </div>
        </div>
        <div className=' md:w-[20%] w-full flex gap-4 items-center  font-bold justify-center md:text-xl text-lg md:flex-row flex-col  '>
            <Link to={'/aboutus'} className={` hover:text-yellow-200`}>
                About Us
            </Link>
            <Link to={'/feedback'} className=' hover:text-yellow-200'>
                Feedback
            </Link>
        </div>
        <div className='md:w-[20%] w-full font-bold md:text-xl text-lg flex flex-col gap-4 justify-center'>
            <div className=' '>
                Follow other Social handle 
            </div>

            <div className='flex  md:text-4xl text-xl items-center gap-3 justify-center'>
                <IoLogoInstagram className=' rounded-lg bg-cover  hover:bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] '/>
                <FaFacebook className={` hover:text-blue-200 `}></FaFacebook>
            </div>
        </div>
    </div>
  )
}

export default Footer