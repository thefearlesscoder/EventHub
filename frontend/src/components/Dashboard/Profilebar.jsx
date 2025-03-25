import React from "react";

const userProfile = {
  image: "https://source.unsplash.com/random/300x300?face",
  firstName: "Kunal",
  username: "kunalsonkar",
  phone: "+91-9876543210",
  email: "kunal@example.com"
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={userProfile.image}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="flex-1 w-full space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{userProfile.firstName}</h2>
              <p className="text-gray-500 text-sm">@{userProfile.username}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-base text-gray-800">{userProfile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base text-gray-800 break-all">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
