import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const AttendedConcerts = () => {
  const [attendedConcerts, setAttendedConcerts] = useState([]);
  const sliderRef = useRef(null);
  let { token } = useSelector((state) => state.auth);
  token = JSON.parse(token);

  const fetchAttendedConcerts = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/concert/my-attended-concerts",
      { token },
      {
        headers: {
          Authorization: token, // Sending token in the header
        },
      }
    );
    console.log("attende concerts:", response.data.data);

    setAttendedConcerts(response.data.data);
  };

  useEffect(() => {
    fetchAttendedConcerts();
  }, []);

useEffect(() => {
  const interval = setInterval(() => {
    if (sliderRef.current) {
      // Check if we've reached the end
      const maxScrollLeft =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (sliderRef.current.scrollLeft >= maxScrollLeft) {
        // Reset to the beginning for a seamless loop
        sliderRef.current.scrollLeft = 0;
      } else {
        // Increment scroll to the right
        sliderRef.current.scrollLeft += 2; // Adjust this value for smoothness and speed
      }
    }
  }, 20); // Short interval for smoother scroll effect

  return () => clearInterval(interval); // Clean up interval on component unmount
}, [attendedConcerts]);


  return (
    <div>
      <div className="w-full p-10 min-h-screen relative">
        <h2 className="text-3xl text-center font-bold mb-6">Attended Concerts</h2>

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
            {attendedConcerts.map((concert) => (
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
                    Venue:{" "}
                    <span className="font-semibold">{concert.place}</span>
                  </p>
                  <p className="text-gray-700 text-lg">
                    Price:{" "}
                    <span className="font-semibold">
                      ₹{concert.ticketPrice}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendedConcerts;
