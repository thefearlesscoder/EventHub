import { BASE_URL } from "../../services/apis";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";


function UserCard({ name, username, address , id }) {

  let { token  } = useSelector( (state) => state.auth )  ;


  const addfriend = async ( id ) => {
    console.log(id) ;
    try {
      const response = await axios.post(
        `${BASE_URL}/friends/request-friend/${id}`,
        { token },
        {
          headers: {
            Authorization: token, 
          },
        }
      );
      console.log("xyz:", response.data.data); 
      toast.success( response.data.message) ;
    } catch (error) {
      console.error(error); 
      toast.error(error.data.message) ;
    }
  } 


  return (
    <div className="max-w-sm w-full inline-block  md:h-[250px] h-[250px] bg-white rounded-xl 
    shadow-lg border-2 border-gray-200 p-6 m-4 transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="text-center flex flex-col items-center justify-around">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
        <p className="text-lg text-gray-500 mb-3">@{username}</p>
        <p className="text-gray-600 mb-6">{address}</p>
        <button onClick={ ()=>addfriend(id)} 
         className="px-6 py-2 bg-richblack-600 text-richblack-25 font-semibold rounded-full shadow-md hover:bg-richblack-100 hover:shadow-md focus:outline-none transition-colors duration-300">
          Add Friend
        </button>
      </div>
    </div>
  );
}

export default UserCard;
