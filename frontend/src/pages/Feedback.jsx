import React from 'react';

// Sample friends data (with additional friends)
const friends = [
  { id: 1, name: 'John Doe', status: 'Active', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', status: 'Offline', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Alex Johnson', status: 'Busy', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 4, name: 'Emily Davis', status: 'Active', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 5, name: 'Michael Brown', status: 'Offline', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 6, name: 'Sarah Wilson', status: 'Busy', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 7, name: 'David Lee', status: 'Active', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: 8, name: 'Olivia Harris', status: 'Offline', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 9, name: 'Daniel Walker', status: 'Busy', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: 10, name: 'Sophia Martinez', status: 'Active', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
];

// FriendCard Component
const FriendCard = ({ name, status, avatar, onChatClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 mx-4 flex-shrink-0">
      <img className="rounded-full w-16 h-16 mx-auto" src={avatar} alt={`${name}'s avatar`} />
      <div className="text-center mt-4">
        <h3 className="text-2xl font-semibold text-richblack-800">{name}</h3>
        
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => onChatClick(name)}
          className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition-all duration-200"
        >
          Chat with {name}
        </button>
      </div>
    </div>
  );
};

// Main FriendsPage Component
const FriendsPage = () => {
  const handleChatClick = (name) => {
    // Logic for initiating a chat with the friend (could be routing to a chat page or opening a modal)
    console.log(`Chat with ${name} initiated!`);
  };

  return (
    <div className="p-8 bg-richblack-5 min-h-screen">
      <h1 className="text-4xl font-bold text-richblue-600 text-center mb-8">My Friends</h1>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex flex-nowrap space-x-8">
          {friends.map(friend => (
            <FriendCard
              key={friend.id}
              name={friend.name}
              status={friend.status}
              avatar={friend.avatar}
              onChatClick={handleChatClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
