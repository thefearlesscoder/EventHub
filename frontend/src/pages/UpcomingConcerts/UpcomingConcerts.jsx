import React from "react";
import ConcertCard from "./ConcertCard";

const UpcomingConcerts = () => {
  const events = [
    {
      artist: "Anoop Kumar",
      location: "Katni, Madhya Pradesh, India",
      date: "2024-11-08T00:00:00.000Z",
    },
    {
      artist: "Arijit Singh",
      location: "Stadium XYZ",
      date: "2024-10-30T19:00:00.000Z",
    },
  ];

    return (
      <div className=" p-10">
            <div className=" font-bold text-2xl ml-[10%]">
                Home / Explore-Concert
            </div>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center md:w-[80%] mx-auto w-full">
            {events.map((event, index) => (
                <ConcertCard
                key={index}
                artist={event.artist}
                location={event.location}
                date={event.date}
                />
            ))}
            </div>
      </div>
  );
};

export default UpcomingConcerts;
