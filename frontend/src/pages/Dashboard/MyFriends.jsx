import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const MyFriends = () => {
  const [myFriends, setMyFriends] = useState([]);
    let { token } = useSelector((state) => state.auth);
  token = JSON.parse(token);
  

  const fetchMyFriends = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/friends/my-friends",
      { token },
      {
        headers: {
          Authorization: token, // Sending token in the header
        },
      }
    );
    console.log(response); 
  } 

  useEffect(() => {
    fetchMyFriends();
  }, [])
  
  return (
    <div>
      
    </div>
  )
}

export default MyFriends
