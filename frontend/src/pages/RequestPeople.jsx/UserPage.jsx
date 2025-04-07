import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../..//services/apis";

function UsersPage() {

  const { id } = useParams() ;  
  let {token , user } = useSelector( (state) => state.auth) ;
  console.log(id) ;
  const [ users , setuser ] = useState([]) ;
  // console.log(`http://localhost:5000/api/v1/concert/get-friends/${id}`) ;
  const requestResponse = async () => {
  
    try {
      const response = await axios.post(
        `${BASE_URL}/concert/get-friends/${id}`, 
        { 
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials:true ,
        }
      );
      console.log("Response:", response.data.data);
      console.log( response.data.data) ;
      setuser( response.data.data) ;
      toast.success(response.data.message) ;

    } catch (error) {
      console.error(error);
    }
  };

  useEffect( () => {
    requestResponse() ;
  }, [id])

  return (
    <div className="flex flex-wrap justify-center bg-gray-100 min-h-screen p-4">
      {users.map(( reguser , index) => (
        reguser._id !== user._id ? <UserCard
          key={index}
          id = { reguser._id}
          name={`${reguser.firstName} ${reguser.lastName}`}
          username={reguser.username}
          address={reguser.address}
        /> : <div></div>
      ))}
    </div>
  );
}

export default UsersPage;
