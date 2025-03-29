import React, { useEffect, useState } from "react";

const Slider2 = () => {
  const parks = [
    {
      name: "Yellowstone National Ground",
      imageUrl: "https://offloadmedia.feverup.com/secretmumbai.com/wp-content/uploads/2024/09/26180243/aditya-chinchure-ZhQCZjr9fHo-unsplash-1-1024x768.jpg",
    },
    {
      name: "Yosemite National Park",
      imageUrl: "https://assets.cntraveller.in/photos/66dec49c13e3e50f498afd28/master/w_1600%2Cc_limit/Fans%2520soak%2520in%2520the%2520best%2520of%2520The%2520War%2520on%2520Drugs'%2520performance%2520in%2520Bengaluru%2C%2520live%2520at%2520Bandland%2C%2520produced%2520and%2520promoted%2520by%2520BookMyShow%2520Live.jpg",
    },
    {
      name: "Grand Canyon National Stadium",
      imageUrl: "https://images.saymedia-content.com/.image/t_share/MTc0NDk0NDkyMjE5NDE4MjQ2/how-to-cover-a-live-gig.jpg",
    },
    {
      name: "Zion National AudioRoom",
      imageUrl: "https://cdn.britannica.com/58/155258-050-2F8189A9/Symphony-concert-Svetlanov-Hall-Moscow-International-House.jpg",
    },
    {
      name: "Rocky Mountain National Stadium",
      imageUrl: "https://www.beatcurry.com/wp-content/uploads/2022/04/Greatest-Benefit-Concert-Thumbnail-1296x700.jpg",
    },
  ];

  const [current, setCurrent] = useState(parks.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev - 1 + parks.length) % parks.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [parks.length]);

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${current * 100}%)` }}>
        {parks.map((park, index) => (
          <div
            key={park.name}
            className="flex-shrink-0 w-full h-full flex justify-center items-center bg-gradient-to-r from-pink-100 via-yellow-200 to-pink-100 p-10"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={park.imageUrl}
                alt={park.name}
                className="w-56 h-56 object-cover rounded-full shadow-lg transform hover:scale-110 transition-transform duration-500"
              />
              <h2 className="text-2xl font-bold text-white mt-4">{park.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider2;
