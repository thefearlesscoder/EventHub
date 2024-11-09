import React from "react";

function UserCard({ name, username, address }) {
  return (
    <div className="max-w-sm w-full inline-block  h-fit bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 m-4 transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
        <p className="text-lg text-gray-500 mb-3">@{username}</p>
        <p className="text-gray-600 mb-6">{address}</p>
        <button className="px-6 py-2 bg-richblack-600 text-richblack-25 font-semibold rounded-full shadow-md hover:bg-richblack-100 hover:shadow-md focus:outline-none transition-colors duration-300">
          Request
        </button>
      </div>
    </div>
  );
}

export default UserCard;
