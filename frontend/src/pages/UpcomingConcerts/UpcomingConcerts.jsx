import React, { useEffect, useState } from "react";
import ConcertCard from "./ConcertCard";
import axios from "axios";

const UpcomingConcerts = () => {
    const [allConcerts, setAllConcerts] = useState([]);

    const fetchAllConcerts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/concert/upcoming-concert"
        );
        console.log("All concerts:", response.data.data);
        setAllConcerts(response.data.data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    useEffect(() => {
      fetchAllConcerts();
    }, []);

    return (
      <div className=" p-10">
        <div className=" font-bold text-2xl ml-[10%]">
          Home / Explore-Concert
        </div>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center md:w-[80%] mx-auto w-full">
          {allConcerts.map((event, index) => (
            <ConcertCard
              key={event.id}
              artist={event.artist}
              location={event.place}
                  date={event.date}
                  id={event.id}
            />
          ))}
        </div>
      </div>
    );
};

export default UpcomingConcerts;
