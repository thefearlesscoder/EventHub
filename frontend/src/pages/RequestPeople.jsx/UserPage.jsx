import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function UsersPage() {

  const { id } = useParams() ;  
  let {token} = useSelector( (state) => state.auth) ;
  console.log(id) ;
  const [ users , setuser ] = useState([]) ;
  console.log(`http://localhost:5000/api/v1/concert/get-friends/${id}`) ;
  token = JSON.parse(token)
  const requestResponse = async () => {
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/concert/get-friends/${id}`, 
        { 
          token ,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Response:", response.data.data);
      console.log( response.data.data._id) ;
      setuser( response.data.data) ;
      toast.success(response.data.message) ;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( () => {
    requestResponse() ;
  }, [])

  return (
    <div className="flex flex-wrap justify-center bg-gray-100 min-h-screen p-4">
      {users.map((user, index) => (
        <UserCard
          key={index}
          id = { user._id}
          name={`${user.firstName} ${user.lastName}`}
          username={user.username}
          address={user.address}
        />
      ))}
    </div>
  );
}

export default UsersPage;
