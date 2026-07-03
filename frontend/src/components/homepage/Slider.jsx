import React, { useEffect, useState } from "react";

const Slider = () => {
  const singers = [
    {
      name: "Arijit Singh",
      imageUrl: "https://artistbookingcompany.com/wp-content/uploads/2024/03/arjit-singh.png",
    },
    {
      name: "Jasmine",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcWE7HxxQc3b7KtaVF69myeMp5ML1j7qnZHFPGaJtlWlBYiDqsQtO_-x8&s=10",
    },
    {
      name: "Shreya Ghoshal",
      imageUrl: "https://blackhattalent.com/wp-content/uploads/2023/08/Shreya-Ghoshal5-scaled.jpg",
    },
    {
      name: "Shaan",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9URk7umiAz73uIHkJjJm4VYCWf46mTWoPukkkRXEaav4HY9MAHtqgsokF&s=10",
    },
    {
      name: "Sonu Nigam",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKDoQL5_rlfSkDOWKrBCoKbVIQbSLSGkh6RMr6fNwK9WbJLAXgiNRnLQ&s=10",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % singers.length);
    }, 3000); // Slide change every 3 seconds
    return () => clearInterval(interval);
  }, [singers.length]);

  return (
    <div className="relative w-full  overflow-hidden bg-black">
        {/* <div className=" text-2xl text-white ">
            Trending Artist
        </div> */}
      <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${current * 100}%)` }}>
        {singers.map((singer, index) => (
          <div
            key={singer.name}
            className="flex-shrink-0 w-full h-full flex justify-center items-center bg-gradient-to-r from-pink-100 via-yellow-200 to-pink-100  p-10"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={singer.imageUrl}
                alt={singer.name}
                className="w-56 h-56 object-cover rounded-full shadow-lg transform hover:scale-110 transition-transform duration-500"
              />
              <h2 className="text-2xl font-bold text-white mt-4">{singer.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
