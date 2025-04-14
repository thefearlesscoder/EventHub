import React, { useEffect, useState } from "react";
import ConcertCard from "./ConcertCard";
import axios from "axios";
import FilterComponent from "../FilterComponent";
import { BASE_URL } from "../../services/apis";
import { FaRupeeSign, FaSpinner } from "react-icons/fa";

const genres = [
  "Pop",
  "Rock",
  "Jazz",
  "Classical",
  "Hip-Hop",
  "Electronic",
  "Genz",
  "Other",
];

const UpcomingConcerts = () => {
  const [allConcerts, setAllConcerts] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (genre) => {
    setSelectedGenre(genre);
  };

  const fetchAllConcerts = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/concert/upcoming-concert`,
        {},
        { withCredentials: true }
      );
      setAllConcerts(response.data.data);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllConcerts();
  }, []);

  useEffect(() => {
    const filtered = selectedGenre
      ? allConcerts.filter((concert) => concert.genre === selectedGenre)
      : allConcerts;
    setFilteredConcerts(filtered);
  }, [selectedGenre, allConcerts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <FaSpinner className="text-4xl text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-10 w-full">
      <div className="font-bold md:text-2xl text-lg ml-[10%] flex md:flex-row flex-col justify-between pr-5 mr-20">
        <p className="md:mb-0 mb-2">Home / Explore-Events</p>
        <FilterComponent
          options={genres}
          onFilterChange={handleFilterChange}
          className="min-w-10"
        />
      </div>
      <div className="h-fit bg-gray-100 flex flex-wrap justify-center gap-6 md:w-[80%] mx-auto w-full py-10">
        {filteredConcerts.length > 0 ? (
          filteredConcerts.map((event) => (
            <div
              key={event.id}
              className="flex flex-col rounded-xl bg-white shadow-lg text-gray-800 overflow-hidden hover:shadow-xl transition-shadow w-full md:w-[45%] lg:w-[30%] p-4"
            >
              <div className="relative h-48 w-full">
                <img
                  alt={event.artist}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-full rounded-t-xl"
                  src={
                    event.image ||
                    "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
                  }
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
                  Upcoming
                </div>
              </div>

              <div className="flex flex-col font-bold text-xl text-blue-800 space-y-3 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-2">
                      {event.artist}
                    </h3>
                    <div className="text-sm leading-6 text-gray-600 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar h-4 w-4"
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-gray-700 bg-gray-200">
                    {event.genre || "Other"}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="line-clamp-2">
                    {event.description || "No description available."}
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin h-4 w-4"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{event.place}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRupeeSign />
                    <span>{event.ticketPrice}</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <a
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 border border-blue-500 bg-blue-500 text-white shadow-sm hover:bg-blue-600 h-9 px-4 py-2"
                    href={`/event/${event.id}`}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No concerts available for the selected genre.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingConcerts;
