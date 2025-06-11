import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cardlogo from "../../assets/cardlogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../slices/authSlice";
import { FaSpinner } from "react-icons/fa";

const EventsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [AttendedEvents, setAttendedConcerts] = useState([]);
  const [AdddedEvents, setAddedEvents] = useState([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAttendedConcerts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${BASE_URL}/concert/my-attended-concerts`,
        {},
        {
          withCredentials: true,
        }
      );
      setAttendedConcerts(response.data.data);
    } catch (error) {
      console.log("Error fetching attended concerts:", error);
    }
    setLoading(false); // End loading
  };

  const fetchAddedConcerts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `${BASE_URL}/concert/my-added-concerts`,
        {
          withCredentials: true,
        }
      );
      setAddedEvents(response.data.data);
    } catch (error) {
      console.log("Error fetching attended concerts:", error);
    }
    setLoading(false); // End loading
  };

  

  const fetchConcerts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${BASE_URL}/concert/my-upcoming-concerts`,
        {},
        { withCredentials: true }
      );
      setUpcomingConcerts(response.data.data);
    } catch (err) {
      console.error("Error fetching concerts:", err);
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    fetchAttendedConcerts();
    fetchConcerts();
    fetchAddedConcerts() ;
  }, []);

  // let AdddedEvents = [];
  // if (user && user.myAddedConcerts != null) {
  //   AdddedEvents = user.myAddedConcerts;
  // }

  const renderEventCard = (event, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
    >
      <div className="bg-richblack-300 rounded-md">
      <div className="max-w-sm bg-white rounded-lg shadow-sm  dark:bg-gray-800 h-full flex flex-col font-bold p-3">
        <a href="#">
          <img
            className="rounded-t-lg w-full h-48 object-cover"
            src={cardlogo}
            alt={event.artist}
          />
        </a>
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {event.artist}
              </h5>
            </a>
            <p className="text-sm text-gray-500 mb-1 flex gap-2"><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin h-4 w-4"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg> {event.place}</p>
            <p className="text-sm text-gray-500 mb-1 flex gap-2">
            <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar h-4 w-4"
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
              {new Date(event.date).toLocaleString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-sm text-gray-500 mb-1">🎵 {event.genre}</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              Join {event.artist} for an unforgettable {event.genre} night at{" "}
              {event.place}!
            </p>
          </div>
          <div
            onClick={() => navigate(`/event/${event._id}`)}
            className="inline-flex items-center justify-center mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Details
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
          </div>
        </div>
      </div>
      </div>
    </motion.div>
    
  );

  console.log( "Upcoming Concerts:", upcomingConcerts);
  console.log("Attended Concerts:", AttendedEvents);
  console.log("Added Events:", AdddedEvents);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
                <FaSpinner className="text-4xl text-richblue-600 animate-spin" />
              </div>
      ) : (
        <div>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            {upcomingConcerts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingConcerts.map((event, idx) =>
                  renderEventCard(event, idx)
                )}
              </div>
            ) : (
              <div className="text-center font-bold text-gray-600 dark:text-gray-300 text-xl">
                No upcoming events
              </div>
            )}
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Attended Events</h2>
            {AttendedEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {AttendedEvents.map((event, idx) =>
                  renderEventCard(event, idx)
                )}
              </div>
            ) : (
              <div className="text-center font-bold text-gray-600 dark:text-gray-300 text-xl">
                No attended events
              </div>
            )}
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">My Added Events</h2>
            {AdddedEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xl">
                {AdddedEvents.map((event, idx) =>
                  renderEventCard(event, idx)
                )}
              </div>
            ) : (
              <div className="text-center font-bold text-gray-600 dark:text-gray-300">
                No added events
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
