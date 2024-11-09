import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const [upcomingConcerts, setUpcomingConcerts] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    let { token } = useSelector((state) => state.auth)
    token = JSON.parse(token)

  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/concert/upcoming-concert"
        );
        setUpcomingConcerts(response.data.data);
      } catch (err) {
        console.error("Error fetching concerts:", err);
        setError("Could not fetch concerts");
      }
    };
      fetchConcerts();
      
      const fetchIncomingRequests = async () => { 
          try {
              console.log("sdhvhjckdsjcbhjdvs");
              
              const response = await axios.post(
                "http://localhost:5000/api/v1/friends/users-requesting-me",
                {token},
                {
                  headers: {
                    Authorization: token, // Sending token in the header
                  },
                }
              );
              console.log(response.data.data.friends);
              
            //   setIncomingRequests(response.data.data);
            } catch (err) {
          }
      }
      fetchIncomingRequests();
  }, []);
    

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
        if (sliderRef.current.scrollLeft <= 0) {
          sliderRef.current.scrollLeft = sliderRef.current.scrollWidth;
        }
      }
    }, 3000); // Adjust the interval to control the speed

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [upcomingConcerts]);

  return (
    <div className="w-full p-10 min-h-screen relative">
      <h2 className="text-3xl font-bold mb-6">Upcoming Concerts</h2>

      {/* Slider with blurred edges */}
      <div className="relative">
        {/* Left and right gradient overlays for the blur effect */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

        <div
          ref={sliderRef}
          className="flex overflow-hidden space-x-4 no-scrollbar pb-5"
          style={{ scrollBehavior: "smooth" }}
        >
          {upcomingConcerts.map((concert) => (
            <div
              key={concert.id}
              className="min-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden p-5 transition-transform transform hover:scale-105"
            >
              <div className="px-4 py-2">
                <h3 className="text-gray-800 text-2xl font-semibold">
                  {concert.artist}
                </h3>
                <p className="text-gray-600 mt-2">
                  {new Date(concert.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="px-4 py-2">
                <p className="text-gray-700 text-lg">
                  Venue: <span className="font-semibold">{concert.place}</span>
                </p>
                <p className="text-gray-700 text-lg">
                  Price:{" "}
                  <span className="font-semibold">₹{concert.ticketPrice}</span>
                </p>
              </div>
              <div className="flex justify-end p-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Buy Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="text-red-500 text-lg mt-4">{error}</div>}
    </div>
  );
};

export default Dashboard;
