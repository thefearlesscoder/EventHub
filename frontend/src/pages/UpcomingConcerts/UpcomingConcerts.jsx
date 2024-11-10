// import React, { useEffect, useState } from "react";
// import ConcertCard from "./ConcertCard";
// import axios from "axios";
// import FilterComponent from "../FilterComponent";

// const genres = [
//   "Pop",
//   "Rock",
//   "Jazz",
//   "Classical",
//   "Hip-Hop",
//   "Electronic",
//   "Genz",
//   "Other",
// ];

// const UpcomingConcerts = () => {
//   const [allConcerts, setAllConcerts] = useState([]);

//    const [selectedGenre, setSelectedGenre] = useState("");

//   const [filteredConcerts, setFilteredConcerts] = useState(allConcerts);

//      const handleFilterChange = (genre) => {
//        setSelectedGenre(genre);
//      };

//     const fetchAllConcerts = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/v1/concert/upcoming-concert"
//         );
//         console.log("All concerts:", response.data.data);
//         setAllConcerts(response.data.data);
//       } catch (error) {
//         console.error("Error fetching concerts:", error);
//       }
//     };

//   useEffect(() => {
//     // Filter concerts whenever selectedGenre or allConcerts change
//     const filtered = selectedGenre
//       ? allConcerts.filter((concert) => concert.genre === selectedGenre)
//       : allConcerts;
//     setFilteredConcerts(filtered);
//   }, [selectedGenre, allConcerts]);

//     useEffect(() => {
//       fetchAllConcerts();
//     }, []);

//     return (
//       <div className="p-10 w-full">
//         <div className="font-bold text-2xl ml-[10%] md:flex-row flex-col justify-between pr-5 mr-20">
//           <p>Home / Explore-Concert</p>
//           <FilterComponent
//             options={genres}
//             onFilterChange={handleFilterChange}
//             className="min-w-10"
//           />
//         </div>
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center md:w-[80%] mx-auto w-full">
//           {filteredConcerts.length > 0 ? (
//             filteredConcerts.map((event) => (
//               <ConcertCard
//                 key={event.id}
//                 artist={event.artist}
//                 location={event.place}
//                 date={event.date}
//                 id={event.id}
//               />
//             ))
//           ) : (
//             <p>No concerts available for the selected genre.</p>
//           )}
//         </div>
//       </div>
//     );
// };

// {/* <ConcertCard
//               key={event.id}
//               artist={event.artist}
//               location={event.place}
//               date={event.date}
//               id={event.id}
//             /> */}

// export default UpcomingConcerts;
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
  const [filteredConcerts, setFilteredConcerts] = useState(allConcerts);

  const handleFilterChange = (genre) => {
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
    // Filter concerts whenever selectedGenre or allConcerts change
    const filtered = selectedGenre
      ? allConcerts.filter((concert) => concert.genre === selectedGenre)
      : allConcerts;
    setFilteredConcerts(filtered);
  }, [selectedGenre, allConcerts]);

  return (
    <div className="p-10 w-11/12">
      <div className=" font-bold text-2xl ml-[10%] flex justify-between items-center md:flex-row flex-col space-y-3  pr-5 mr-20">
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
