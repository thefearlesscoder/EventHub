import { BASE_URL } from '../services/apis';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

// Sample fallback data (optional)
const friends1 = [];
const friendRequests1 = [];





const FriendRequestCard = ({ name, avatar, onAccept, onDecline }) => (
  <div className="bg-white shadow-md rounded-lg p-10 pt-6 pb-6 w-64 md:w-80 md:mx-5 mx-auto">
    <div className="flex justify-center items-center gap-4 mb-8">
      <img className="rounded-full w-16 h-16 sm:w-18 sm:h-18" src={avatar} alt={`${name}'s avatar`} />
      <p className="text-base sm:text-lg font-medium">{name}</p>
    </div>
    <div className="flex justify-around gap-4">
      <button
        onClick={onAccept}
        className="bg-caribbeangreen-500 text-white px-4 py-2 text-sm sm:text-base rounded-md hover:bg-caribbeangreen-600 transition duration-200"
      >
        Accept
      </button>
      <button
        onClick={onDecline}
        className="bg-pink-500 text-white px-4 py-2 text-sm sm:text-base rounded-md hover:bg-pink-600 transition duration-200"
      >
        Reject
      </button>
    </div>
  </div>
);

const FriendsPage = () => {
  const [friendRequests, setFriendRequests] = useState(friendRequests1);
  const [friends, setFriends] = useState(friends1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate() ;

  const handleChatClick = (name) => {
    console.log(`Chat with ${name} initiated!`);
  };

  const FriendCard = ({ name, avatar, onChatClick }) => (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-64 md:w-80 mx-2 flex-shrink-0">
      <img className="rounded-full w-14 h-14 md:w-16 md:h-16 mx-auto" src={avatar} alt={`${name}'s avatar`} />
      <div className="text-center mt-4">
        <h3 className="text-lg md:text-2xl font-semibold text-richblack-800">{name}</h3>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => { navigate(`/chat`)} }
          className="bg-black text-white text-sm md:text-base px-3 py-2 md:px-4 md:py-2 rounded-md shadow-md hover:bg-gray-800 transition-all duration-200"
        >
          Chat with {name}
        </button>
      </div>
    </div>
  );

  const handleAccept = (name) => {
    console.log(`Friend request from ${name} accepted!`);
  };

  const handleDecline = (name) => {
    console.log(`Friend request from ${name} declined!`);
  };

  const fetchIncomingRequests = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/friends/users-requesting-me`,
        {},
        { withCredentials: true }
      );
      // setFriendRequests(response.data.data.friends);
      console.log("Incoming Requests:", response.data);
      setFriendRequests(response.data.data.friends);
    } catch (err) {
      console.error(err);
    }
  };

  const getfriends = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/friends/my-friends`,
        {},
        { withCredentials: true }
      );
      setFriends(response.data.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
      toast.error("Failed to fetch friends");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getfriends(), fetchIncomingRequests()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="text-4xl text-richblue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-richblack-5 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-richblue-600 md:ml-10 mb-6 md:mb-8">
        My Friends
      </h1>

      <div className="overflow-x-auto no-scrollbar mb-10">
        <div className="flex flex-nowrap space-x-4 md:space-x-8 px-2">
          {friends.map((friend) => (
            <FriendCard
              key={friend.friendId || friend.id}
              name={friend.name}
              avatar={friend.image || friend.avatar}
              onChatClick={handleChatClick}
            />
          ))}
        </div>
      </div>

      {friendRequests.length > 0 && (
        <div className="mt-8">
          <h2 className="md:text-2xl text-xl font-bold text-richblue-500 mb-6 md:ml-10">
            Friend Requests
          </h2>
          <div className="overflow-x-auto no-scrollbar mb-10">
            <div className="flex flex-nowrap space-x-8 md:space-x-8">
              {friendRequests.map((request) => (
                <FriendRequestCard
                  key={request.friendId}
                  name={request.name}
                  avatar={request.image}
                  onAccept={() => handleAccept(request.name)}
                  onDecline={() => handleDecline(request.name)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
