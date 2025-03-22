import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cardlogo from "../../assets/cardlogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../services/apis";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../slices/authSlice";
// import { set } from "react-hook-form";

const user = {
  upcomingEvents: [
    {
      title: "React Conference 2025",
      date: "2025-04-10",
      location: "San Francisco, CA",
      description: "A premier event for React developers around the world.",
      image: "https://source.unsplash.com/random/400x200/?react,conference",
    },
    {
      title: "Startup Meetup",
      date: "2025-04-15",
      location: "New York, NY",
      description: "Networking and idea sharing among startup founders.",
      image: "https://source.unsplash.com/random/400x200/?startup,meetup",
    },
    {
      title: "Frontend Workshop",
      date: "2025-04-20",
      location: "Austin, TX",
      description: "Hands-on workshop for mastering frontend technologies.",
      image: "https://source.unsplash.com/random/400x200/?frontend,workshop",
    },
    {
      title: "Design Sprint",
      date: "2025-04-22",
      location: "Remote",
      description: "Rapid prototyping and UX design sessions.",
      image: "https://source.unsplash.com/random/400x200/?design,sprint",
    },
    {
      title: "AI in Web Dev",
      date: "2025-04-25",
      location: "Seattle, WA",
      description: "Exploring AI tools and techniques in web development.",
      image: "https://source.unsplash.com/random/400x200/?ai,web",
    },
  ],
  attendedEvents: [
    {
      title: "Tech Talk 2024",
      date: "2024-11-01",
      location: "Los Angeles, CA",
      description: "A talk on upcoming tech trends.",
      image: "https://source.unsplash.com/random/400x200/?tech,talk",
    },
    {
      title: "Product Launch Event",
      date: "2024-12-20",
      location: "Chicago, IL",
      description: "Launch of our new product line.",
      image: "https://source.unsplash.com/random/400x200/?product,launch",
    },
  ],
  createdEvents: [
    {
      title: "Admin Planning Session",
      date: "2025-03-05",
      location: "Remote",
      description: "Internal session to plan upcoming activities.",
      image: "https://source.unsplash.com/random/400x200/?planning,session",
    },
  ],
};


// artist
// : 
// "Arijit Singh"
// date
// : 
// "2025-02-13T19:00:00.000Z"
// genre
// : 
// "Classical"
// place
// : 
// "Stadium XYZ"
// ticketPrice
// : 
// 1500

const EventsPage = () => {

    const { loading } = useSelector((state) => state.auth);
    const [AttendedEvents, setAttendedConcerts] = useState([]);
    const [upcomingConcerts, setUpcomingConcerts] = useState([]);
      let { user } = useSelector((state) => state.auth);
      // token = JSON.parse(token);

    const dispatch = useDispatch () ;
    const navigate = useNavigate() ;
    
      const fetchAttendedConcerts = async () => {
        
        try {
          dispatch(setLoading(true));
          const response = await axios.post(
            `${BASE_URL}/concert/my-attended-concerts`,
            { },
            {
              withCredentials : true ,
            }
          );
          console.log("attende concerts:", response.data.data);
          
          setAttendedConcerts(response.data.data);
        } catch (error) {
            console.log("Error fetching attended concerts:", error);
        }
        dispatch(setLoading(false));
        
      };

      const fetchConcerts = async () => {
        dispatch(setLoading(true));
        try {
          const response = await axios.post(
            `${BASE_URL}/concert/my-upcoming-concerts`,
            {  },{withCredentials:true }
          );
          setUpcomingConcerts(response.data.data);
          console.log(response.data.data);
        } catch (err) {
          console.error("Error fetching concerts:", err);
          setError("Could not fetch concerts");
        }
        dispatch(setLoading(false ));
      };
        
    // const calculateTotalExpense = (events) => {
    //   return events.reduce(
    //     (total, event) => total + event.ticketPrice,
    //     0
    //   );
    // };
    
      useEffect(() => {
          fetchAttendedConcerts();
          fetchConcerts();
        //   calculateTotalExpense(attendedConcerts);
      }, []);




      const renderEventCard = (event, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div className="max-w-sm bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
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
                <p className="text-sm text-gray-500 mb-1">📍 {event.place}</p>
                <p className="text-sm text-gray-500 mb-1">
                  📅 {new Date(event.date).toLocaleString(undefined, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-sm text-gray-500 mb-1">🎵 {event.genre}</p>
                {/* <p className="text-sm text-gray-500 mb-3">🎟️ ₹{event.ticketPrice}</p> */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Join {event.artist} for an unforgettable {event.genre} night at {event.place}!
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center mt-auto px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              </a>
            </div>
          </div>
        </motion.div>
      );
      
      
      

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">My Events</h1> */}

        {
            loading ? (<div></div>) : (
            <div>
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                {upcomingConcerts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingConcerts.map((event, idx) => renderEventCard(event, idx))}
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
                    {AttendedEvents.map((event, idx) => renderEventCard(event, idx))}
                  </div>
                ) : (
                  <div className="text-center font-bold text-gray-600 dark:text-gray-300">
                    No attended events
                  </div>
                )}
              </section>

            </div>

          
          )
        }

        



      {/* {user.isAdmin && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Created Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.createdEvents.map((event, idx) => renderEventCard(event, idx))}
          </div>
        </section>
      )} */}
    </div>
  );
};

export default EventsPage;
