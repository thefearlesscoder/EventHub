import React, { useEffect, useState } from "react";

const Slider = () => {
  const singers = [
    {
      name: "Arijit Singh",
      imageUrl: "https://artistbookingcompany.com/wp-content/uploads/2024/03/arjit-singh.png",
    },
    {
      name: "Lata Mangeshkar",
      imageUrl: "https://img.wynk.in/unsafe/200x200/filters:no_upscale():strip_exif():format(jpg)/http://s3.ap-south-1.amazonaws.com/discovery-prod-zion/zion/1696453031994-Lata.png",
    },
    {
      name: "Shreya Ghoshal",
      imageUrl: "https://blackhattalent.com/wp-content/uploads/2023/08/Shreya-Ghoshal5-scaled.jpg",
    },
    {
      name: "Kishore Kumar",
      imageUrl: "https://a10.gaanacdn.com/gn_img/artists/DwPKOxB3qV/DwPKOv0bqV/size_m_1716893175.jpg",
    },
    {
      name: "Sonu Nigam",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Tri_Nation_Mega_Concert_Sonu_Nigam_%288388639915%29.jpg",
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
