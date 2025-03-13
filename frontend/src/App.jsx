import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage'
// import { ToastContainer } from "react-toastify"
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUs';
import Feedback from './pages/Feedback';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Updatedetail from './pages/Updatedetail';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Login/SignupForm';
import { ResetPasswordPage } from './pages/ResetPassword';
import CreateConcert from './pages/CreateConcert';
import Concert from './pages/Concert';
import Dashboard from './pages/Dashboard/Dashboard';
import RequestPeople from './pages/RequestPeople.jsx/RequestPeople';
import UpcomingConcerts from './pages/UpcomingConcerts/UpcomingConcerts';
import PaymentSuccessPage from './pages/PaymentSuccessPage';



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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/update-profile" element={<Updatedetail />}></Route>
        <Route path="/forgot-password" element={<ForgetPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordPage />}
        ></Route>
        <Route path="/create-concert" element={<CreateConcert />}></Route>
        <Route path="/concert/:id" element={<Concert />}></Route>
        {/* <Route path="/test1" element={<RequestPeople />}></Route> */}
        <Route path="/register-succes/:id" element={<PaymentSuccessPage />} />
        <Route path="/concert" element={<UpcomingConcerts />}></Route>
        <Route path="/concert/:id/people" element={<RequestPeople />}></Route>
      </Routes>
      {/* <ToastContainer /> */}
      <Toaster></Toaster>
      <Footer />

      {/* </Router> */}
    </div>
  );
}

export default App