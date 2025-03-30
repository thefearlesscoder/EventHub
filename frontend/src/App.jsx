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
import Navbar1 from './components/Navbar/Navbar1';
import Dashboard1 from './components/Dashboard/DashBoard';
import ShowLocation from './pages/Maps/ShowLocation';
import NavigateLocation from './pages/Maps/NavigateLocation';
import ChatPage from './pages/Chat';
import { MapLoader } from './pages/Maps/Maploader';
import MapComponent from './pages/Map';

// import Navigate from './pages/Navigate';
// import Map from './pages/Map';



function App() {

  return (
    <div className="bg-richblack-5 " data-theme="dark">
      <Navbar1/>
      {/* <Router> */}

      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<Feedback />} />
        <Route path="/dashboard" element={<Dashboard1 />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/update-profile" element={<Updatedetail />}></Route>
        <Route path="/forgot-password" element={<ForgetPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordPage />}
        ></Route>
        <Route path="/create-concert" element={<CreateConcert />}></Route>
        <Route path="/event/:id" element={<Concert />}></Route>
        {/* <Route path="/test1" element={<RequestPeople />}></Route> */}
        <Route path="/register-succes/:id" element={<PaymentSuccessPage />} />
        <Route path="/events" element={<UpcomingConcerts />}></Route>
        <Route path="/concert/:id/people" element={<RequestPeople />}></Route>
        <Route path="/showlocation" element={<ShowLocation />} />
        <Route path="/navigate" element={<MapComponent />} />
        {/* <Route path="/location" element={<MapLoader />} /> */}

        {/* <Route path="/displaymap" element={<Map />} /> */}
        {/* <Route path="/navigate" element={<Navigate />} /> */}
        <Route path='/chat' element={ <ChatPage/> } />
      </Routes>
      {/* <ToastContainer /> */}
      <Toaster></Toaster>
      <Footer />

      {/* </Router> */}
    </div>
  );
}

export default App