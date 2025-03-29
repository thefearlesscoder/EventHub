import React from 'react'
import Logo from '../../assets/logo.jpg'
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <div className="bg-blue-900 text-gray-400 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-evenly gap-8">
        {/* Left Section - Logo & Social Links */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-pure-greys-200">My Academy</h2>
          <p className="text-pure-greys-200">
            Wits seamlessly connects your members with community & resources.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-110"
            >
              <FaFacebook/>
            </a>
            <a
              href="#"
              className="p-2 bg-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-110"
            >
              <FaInstagram/>
            </a>
            <a
              href="#"
              className="p-2 bg-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-110"
            >
              <FaTwitter/>
            </a>
          </div>
        </div>

        {/* Center Section - Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-pure-greys-200">
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Checkout
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Fraud
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Protection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Payments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Accounts
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-3">Learn</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  ThinkShop
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-200 mb-3">About</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-200 transition-transform transform hover:scale-105"
                >
                  News & Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Contact */}
        <div className="text-center text-pure-greys-200 md:text-left">
          <h2 className="text-2xl font-semibold text-gray-200">Contact Us</h2>
          <button className="mt-4 bg-red-600 hover:bg-red-700 text-gray-200 px-5 py-2 rounded-lg transition-transform transform hover:scale-110">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-white mt-8 pt-6 text-center text-pure-greys-200">
        &copy; 2024 My Academy. All rights reserved.
      </div>
    </div>
  )
}

export default Footer