import { BASE_URL } from '../..//services/apis';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const MyFriends = () => {
  const [myFriends, setMyFriends] = useState([]);
    let { token } = useSelector((state) => state.auth);
  // token = JSON.parse(token);
  

  const fetchMyFriends = async () => {
    try {
      const response = await axios.post(
          `${BASE_URL}/friends/my-friends`,
        {},
        {
          withCredentials : true ,
        }
      );
      console.log("xyz:", response.data.data); 
      setMyFriends(response.data.data);  
    } catch (error) {
      console.error(error); 
    }
  } 

  useEffect(() => {
    fetchMyFriends();
  }, [])
  
  return (
    <div>
      <div className="w-full p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">My Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            myFriends.map((friend , i ) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-6 
              flex flex-col items-center space-y-4 transition transform hover:scale-105 hover:shadow-lg"
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
                <button className="bg-caribbeangreen-600 text-white px-4 py-2 rounded-md hover:bg-caribbeangreen-400 transition">
                  Send Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFriends
