import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const IncomingRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  let { token } = useSelector((state) => state.auth);
  token = JSON.parse(token);

  useEffect(() => {
    const fetchIncomingRequests = async () => {
      try {
        console.log("sdhvhjckdsjcbhjdvs");

        const response = await axios.post(
          "http://localhost:5000/api/v1/friends/users-requesting-me",
          { token },
          {
            headers: {
              Authorization: token, // Sending token in the header
            },
          }
        );
        console.log(response.data.data.friends);
        setIncomingRequests(response.data.data.friends);
      } catch (err) {}
    };
    fetchIncomingRequests();
  }, []);
    return (
      <div>
        <div className="w-full p-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Friend Requests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {incomingRequests.map((friend) => (
              <div
                key={friend.senderId}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4 transition transform hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={friend.image?.url || "https://via.placeholder.com/150"}
                  alt={friend.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold text-center">
                  {friend.name}
                </h3>

                <div className="flex space-x-4 w-full justify-center">
                  <button className="bg-caribbeangreen-600 text-white px-4 py-2 rounded-md hover:bg-caribbeangreen-400 transition">
                    Accept
                  </button>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-400 transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default IncomingRequests;
