import React, { useEffect, useState } from "react";
import ConcertCard from "./ConcertCard";
import axios from "axios";
import FilterComponent from "../FilterComponent";

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
  const [selectedGenre, setSelectedGenre] = useState(""); // single selection
  const [filteredConcerts, setFilteredConcerts] = useState([]);

  const handleFilterChange = (genre) => {
    console.log("Selected genre:", genre); // Debug: Check selected genre
    setSelectedGenre(genre);
  };

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

  useEffect(() => {
    console.log("Filtering concerts by genre:", selectedGenre); // Debug: Check filter condition
    const filtered = selectedGenre
      ? allConcerts.filter((concert) => concert.genre === selectedGenre)
      : allConcerts;
    setFilteredConcerts(filtered);
  }, [selectedGenre, allConcerts]);

  return (
    <div className="p-10 w-full">
      <div className="font-bold text-2xl ml-[10%] flex md:flex-row flex-col justify-between pr-5 mr-20">
        <p>Home / Explore-Concert</p>
        <FilterComponent
          options={genres}
          onFilterChange={handleFilterChange}
          className="min-w-10"
        />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center md:w-[80%] mx-auto w-full">
        {filteredConcerts.length > 0 ? (
          filteredConcerts.map((event) => (
            <ConcertCard
              key={event.id}
              artist={event.artist}
              location={event.place}
              date={event.date}
              id={event.id}
            />
          ))
        ) : (
          <p>No concerts available for the selected genre.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingConcerts;
