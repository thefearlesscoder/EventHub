import React from "react";
import { Link } from "react-router-dom";

const ConcertCard = ({ artist, location, date }) => {
  const [allConcerts, setAllConcerts] = useState([]);

  const fetchAllConcerts = async () => {
    try {
      const response = await axios.post("")
    } catch (error) {
      
    }
  }
  return (
    <div className="bg-white shadow-md hover:shadow-lg flex transition-shadow duration-300 ease-in-out rounded-lg p-6 mt-5 m-10 w-full mb-6">
      <div className="w-full flex justify-between ml-5 mr-5 items-center md:flex-row flex-col md:items-center md:gap gap-5">
        <div>
          <h2 className="text-2xl leading-10 my-auto font-semibold text-gray-800">
            {artist}
          </h2>
        </div>

        <div>
          <p className="text-gray-500 font-semibold leading-5 text-center mt-2">
            {location}
          </p>
          <p className="text-richblack-700 font-bold shadow-sm text-center mt-1">
            {new Date(date).toDateString()}
          </p>
        </div>

        <div className="">
          <Link to="">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out">
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;