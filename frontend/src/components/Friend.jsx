import { useState } from "react";
import { Check, X } from "lucide-react";

export default function FriendsPage() {
    const generateInitialImage = (name) => {
        const initial = name.charAt(0).toUpperCase();
        return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff&size=50`;
      };
      

  const [friends, setFriends] = useState([
    { id: 1, name: "Mohammad Mojij Ansari", image: generateInitialImage("Mohammad") },
    { id: 2, name: "John Doe", image: generateInitialImage("John") },
  ]);

  const [friendRequests, setFriendRequests] = useState([
    { id: 3, name: "Jane Smith", image: generateInitialImage("Jane") },
    { id: 4, name: "Alice Johnson", image: generateInitialImage("Alice") },
  ]);

  const acceptRequest = (id) => {
    const request = friendRequests.find((req) => req.id === id);
    if (request) {
      setFriends((prev) => [...prev, request]);
      setFriendRequests((prev) => prev.filter((req) => req.id !== id));
    }
  };

  const declineRequest = (id) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="p-8 space-y-8 bg-white text-black min-h-screen">
      <h2 className="text-3xl font-bold">Friends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.map((friend) => (
          <div key={friend.id} className="p-6 shadow-lg border border-gray-300 rounded-lg flex items-center space-x-4 bg-gray-100 hover:bg-gray-200 transition duration-300">
            <img src={friend.image} alt={friend.name} className="w-12 h-12 rounded-full border border-gray-400" />
            <p>{friend.name}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-8">Friend Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {friendRequests.map((request) => (
          <div key={request.id} className="p-6 shadow-lg border border-gray-300 rounded-lg flex items-center justify-between space-x-4 transform transition-all duration-300 hover:scale-105 hover:bg-gray-200">
            <div className="flex items-center space-x-4">
              <img src={request.image} alt={request.name} className="w-12 h-12 rounded-full border border-gray-400" />
              <span>{request.name}</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => acceptRequest(request.id)} className="p-2 border border-green-500 rounded-lg bg-gray-200 hover:bg-green-700 transition duration-300">
                <Check className="w-5 h-5" />
              </button>
              <button onClick={() => declineRequest(request.id)} className="p-2 border border-red-500 rounded-lg bg-gray-200 hover:bg-red-700 transition duration-300">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
