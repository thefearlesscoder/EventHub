import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage'
// import { ToastContainer } from "react-toastify"
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUs';
import Feedback from './pages/Feedback';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import TestPage from './pages/TestPage.jsx';
import TestPage2 from './pages/TestPage2.jsx';
import Updatedetail from './pages/Updatedetail';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Login/SignupForm';
import { ResetPasswordPage } from './pages/ResetPassword';


function App() {

  return (
    <div className="bg-richblack-5 ">
      <Navbar></Navbar>
      {/* <Router> */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<Feedback />} />
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/update-profile' element={<Updatedetail/>}></Route>
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/testpage2" element={<TestPage2 />} />
        <Route path='/forgot-password' element={<ForgetPassword/>}></Route>
        <Route path='/reset-password/:token' element={<ResetPasswordPage/>}></Route>
      </Routes>
      {/* <ToastContainer /> */}
      <Toaster></Toaster>
      <Footer />

      {/* </Router> */}
    </div>
  );
}

export default App