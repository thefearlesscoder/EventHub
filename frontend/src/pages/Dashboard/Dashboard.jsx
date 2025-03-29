import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyFriends from "./MyFriends";
import AttendedConcerts from "./AttendedConcerts";
import Expenditure from "./Expenditure";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/apis";

const Dashboard = () => {
  const [upcomingConcerts, setUpcomingConcerts] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  let token = useSelector((state) => state.auth.token);

  console.log("token : " ,token , " " , typeof(token))
  if ( token != null && typeof(token) != "string"){
    // token = JSON.parse(token);
    console.log("tpken : " , token)
  }
  console.log("token : " ,token)

  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  const fetchConcerts = async () => {
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
  };

  const fetchIncomingRequests = async () => {
    try {
      console.log("sdhvhjckdsjcbhjdvs");
      console.log(BASE_URL)
      const response = await axios.post(
        `${BASE_URL}/friends/users-requesting-me`,
        { },
        {
          withCredentials:true ,
        }
      );
      console.log(response);
      setIncomingRequests(response.data.data.friends);
    } catch (err) {}
  };

  const [status, setStatus] = useState('pending');
  const [currentFriendId, setCurrentFriendId] = useState(''); 

  const acceptRequest = (id) => {
    setStatus("accepted");
    setCurrentFriendId (id);
    console.log("aaaaaaaaaaaaaaaa click on saccpet");
    requestResponse() ;
  };
  const rejectRequest = (id) => {
    setStatus("Rejected");
    setCurrentFriendId(id);  
    requestResponse() ;
  };

  const requestResponse = async () => {
    if (!currentFriendId || status === 'pending') return;
  
    try {
      const response = await axios.post(
        `${BASE_URL}/friends/response-request/${currentFriendId}`, 
        { 
          // token,
          status,
        },
        {
          withCredentials:true ,
        }
      );
      console.log("Response frined :", response.data);
      setIncomingRequests((prevRequests) =>
        prevRequests.filter((friend) => friend.senderId !== currentFriendId)
      );
      toast.success(response.data.message) ;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchConcerts();
    fetchIncomingRequests();
    // console.log("hellooooooo")
    // console.log(upcomingConcerts) ;
  }, [token , status  ]);

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
    <div className="flex flex-col">
      <div className="w-full p-10 h-fit relative">
        <h2 className="text-3xl text-center font-bold mb-6">Upcoming Concerts</h2>
        <div className="relative">
      
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

          <div
            ref={sliderRef}
            className="flex overflow-hidden space-x-4 no-scrollbar pb-5"
            style={{ scrollBehavior: "smooth" }}
          >
            {upcomingConcerts.map((concert) => (
              <div
                key={concert._id}
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

                <Link to={`/concert/${concert._id}/people`}>
                  <button className="mt-4 px-6 py-2 bg-green-500 text-black font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none transition-colors duration-300">
                    Find More People
                  </button>
                </Link>
                
              </div>
            ))}
          </div>
        </div>

        {error && <div className="text-red-500 text-lg mt-4">{error}</div>}
      </div>

      {/* Incoming Friend Requests Section */}
      <div className="w-full p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Friend Requests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {incomingRequests.map((friend) => (
            <div
              key={friend.senderId}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4 transition transform hover:scale-105 hover:shadow-lg"
            >
              <img
                src={friend.image || "https://via.placeholder.com/150"}
                alt={friend.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-center">
                {friend.name}
              </h3>

              <div className="flex space-x-4 w-full justify-center">
                <button className="bg-caribbeangreen-600 text-white px-4
                   py-2 rounded-md hover:bg-caribbeangreen-400 transition" onClick={ () => {
                      acceptRequest(friend.friendId)
                   }}>
                  Accept
                </button>
                <button onClick={ () => {rejectRequest (friend.friendId) } } className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-400 transition">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <MyFriends/> */}

      {/* Attended Concerts */}
      <AttendedConcerts />

      <MyFriends/>
      <Expenditure/>
    </div>
  );
};

export default Dashboard;
