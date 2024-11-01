import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify"
import Signup from './pages/Signup';
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUs';
import Feedback from './pages/Feedback';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile';



function App() {

  return (

    <div className="">
      <Navbar></Navbar>
      {/* <Router> */}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* <ToastContainer /> */}
      <Toaster></Toaster>
      <Footer />

      {/* </Router> */}
    </div>

  );
}

export default App