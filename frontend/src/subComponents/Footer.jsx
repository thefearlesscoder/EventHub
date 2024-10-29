import React from "react";
import { LuGithub } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import logo from '../assets/logo.svg';
const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className=" flex flex-col mx-auto px-4 w-full">
          {/* Main Footer Content */}
          <div className="mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">MusicMate</h3>
                <img src={logo} alt="LOGO" className="w-20 h-20" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Help Center</h3>
                <ul>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Discord Server
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div> */}

              <div className="flex flex-col mx-auto items-center ">
                <h3 className="text-lg font-semibold mb-4">Socials</h3>
                <ul className="flex justify-center space-x-5">
                  <li className="py-3">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <FaInstagram className="h-7 w-7" />
                    </a>
                  </li>
                  <li className="py-3">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <LuGithub className="h-7 w-7" />
                    </a>
                  </li>
                  <li className="py-3">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <AiOutlineLinkedin className="h-7 w-7" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            {/* Divider */}
            <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <span className="text-gray-400 text-sm">© 2024 MusicMate™</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
