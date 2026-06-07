// import Footer from "../components/Footer/Footer.jsx"
import Slider2 from "../components/homepage/Slider2.jsx";
import Slider from "../components/homepage/Slider.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../services/apis.js";
import cardlogo from "../assets/cardlogo.jpg";
import Footer from '../components/Footer/Footer.jsx';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [allConcerts, setAllConcerts] = useState([]);

  const fetchAllConcerts = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/concert/upcoming-concert`,{},{
          withCredentials :true ,
        }
      );
      console.log("All concerts:", response.data.data);
      setAllConcerts(response.data.data);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    }
  };
  useEffect(() => {
    fetchAllConcerts();
    console.log('hello') ;
  }, []);

  console.log(allConcerts)


  return (

    <div className="bg-gray-900 text-black min-h-screen">



      <section
        className="flex items-center justify-center md:pt-30 md:pb-40 p-20 bg-cover bg-center relative w-full"
        style={{ backgroundImage: 'url("https://example.com/hero-image.jpg")' }}
      >

        <div className="z-10 text-center px-4 text-black">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-wide bg-clip-text 
          text-transparent bg-gradient-to-r from-blue-300 to-blue-700  animate-text-glow">
            Event<span className=" font-extrabold">Hub</span>
          </h1>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Experience the Event Like Never Before</h1>
          <p className="text-xl md:text-2xl mb-6 font-bold ">Discover the best Event happening near you.</p>
          <button onClick={() => { navigate('/events') }} className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition duration-300">
            Explore Event
          </button>
        </div>
      </section>


      <div className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1493308903033-e622ac815e5d?q=80&w=1540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>


        <div className="relative z-10 text-center text-white px-6 py-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Feel the joy Live</h1>
          <p className="text-lg md:text-xl mb-6">Join us for unforgettable concerts and events</p>
          <button onClick={() => { navigate('/signup') }} className="px-8 py-3 bg-pink-400 hover:bg-pink-600 rounded-full text-white font-semibold transition duration-300">
            SignUp
          </button>
        </div>
      </div>


      <div className="relative md:pd-30 p-16 w-full bg-cover bg-center "
        style={{ backgroundImage: 'url("https://example.com/concert-hero.jpg")' }}>
        <div className="absolute  bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
            Experience the Rhythm Up Close!
          </h1>
          <p class="text-lg md:text-2xl mb-6 max-w-lg">
            Same one is waiting for your Arrival come Asap!
          </p>
          <button onClick={() => { user ? navigate('/dashboard') : navigate('login') }} class="px-6 py-3 bg-yellow-500  font-semibold rounded-full
                     hover:bg-yellow-400 text-white  transition duration-300">
            View your dashboard
          </button>
        </div>
      </div>

      <div className=" text-6xl text-center w-full font-bold p-5 ">Trending Artist</div>
      <Slider />

      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">Join a Community of Event Lovers</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">10,000+</span>
              <p className="text-md md:text-lg mt-2">Concerts</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">500,000+</span>
              <p className="text-md md:text-lg mt-2">Users</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">100+</span>
              <p className="text-md md:text-lg mt-2">Venues</p>
            </div>
          </div>
        </div>
      </section>

      <div className=" text-6xl text-center w-full font-bold p-5 ">Our Famous Event</div>
      <Slider2 />

      <section className="py-12 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-semibold text-center text-bla mb-8 md:mb-10">Featured Events</h2>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 md:text text-center md:p-10 p-10 pb-0">
            {[1 , 2 , 3 ].map((concert) => (
             <div className="max-w-sm bg-white  rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
             <a href="#">
               <img
                 className="rounded-t-lg w-full h-48 object-cover"
                 src={cardlogo}// Replace with your actual path or import
                 alt="Blog cover"
               />
             </a>
             <div className="p-5">
               <a href="#">
                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                   Noteworthy technology acquisitions 2021
                 </h5>
               </a>
               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                 Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
               </p>
               <a
                 href="#"
                 className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
                 Read more
                 <svg
                   className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                   aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 14 10"
                 >
                   <path
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M1 5h12m0 0L9 1m4 4L9 9"
                   />
                 </svg>
               </a>
             </div>
           </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
            

      {/* <footer className="py-8 bg-gray-800 text-center">
        <p className="text-gray-400 text-sm md:text-md">© 2024 MusicMate. All rights reserved</p>
      </footer> */}
    </div>
  );
};



export default LandingPage;
