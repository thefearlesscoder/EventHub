import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = () => {
  const [upcomingConcerts, setUpcomingConcerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered"); // Check if this prints
    const fetchConcerts = async () => {
      try {
        console.log("inside try");
        const response = await axios.get(
          "http://localhost:5000/api/v1/concert/upcoming-concert"
        );
          
          const arrayData = Object.entries(response.data);

const convertToArray = (obj) => {
  const result = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push({ key, value: obj[key] });
    }
  }
  return result;
};
          console.log("arraya wala data :", convertToArray(arrayData));
          const data = convertToArray(arrayData);
          console.log(typeof(data));
          
            
        setUpcomingConcerts(arrayData);
      } catch (err) {
        console.error("Error fetching concerts:", err);
        setError("Could not fetch concerts");
      }
    };
    fetchConcerts();
  }, []);

  return (
    <div>
      <div className="w-full p-10 min-h-screen">
        <div className="w-full min-h-screen">
          {/* My Friends */}
          <div>
            <h2>Upcoming Concerts</h2>
            {upcomingConcerts.map((concert) => {
              return (
                <div key={concert._id}>
                  <h3>{concert.name}</h3>
                  <p>{concert.date}</p>
                  <p>{concert.venue}</p>
                </div>
              );
            })}
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
