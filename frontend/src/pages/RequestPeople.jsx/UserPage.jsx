import React from "react";
import UserCard from "./UserCard";

function UsersPage() {
  const users = [
    {
      name: "Jane Doe",
      username: "janedoe",
      address: "123 Main St, Cityville",
    },
    {
      name: "John Smith",
      username: "johnsmith",
      address: "456 Elm St, Townsville",
    },
    {
      name: "John Smith",
      username: "johnsmith",
      address: "456 Elm St, Townsville",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center bg-gray-100 min-h-screen p-4">
      {users.map((user, index) => (
        <UserCard
          key={index}
          name={user.name}
          username={user.username}
          address={user.address}
        />
      ))}
    </div>
  );
}

export default UsersPage;
