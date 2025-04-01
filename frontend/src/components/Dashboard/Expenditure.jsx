import { BASE_URL } from "../../services/apis";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const expenditures = [
  { id: 1, item: "Venue Booking", amount: 5000, date: "2025-03-01" },
  { id: 2, item: "Catering", amount: 2500, date: "2025-03-03" },
  { id: 3, item: "Decorations", amount: 1200, date: "2025-03-04" },
  { id: 4, item: "Printing Flyers", amount: 300, date: "2025-03-05" },
  { id: 5, item: "Photography", amount: 800, date: "2025-03-06" },
];

const ExpenditurePage = () => {

  const [AttendedEvents, setAttendedConcerts] = useState([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState([]);
    let { user } = useSelector((state) => state.auth);
    // token = JSON.parse(token);
  
    const fetchAttendedConcerts = async () => {
      const response = await axios.post(
        `${BASE_URL}/concert/my-attended-concerts`,
        { },
        {
          withCredentials : true ,
        }
      );
      console.log("attende concerts:", response.data.data);
  
      setAttendedConcerts(response.data.data);
      
    };

    const fetchConcerts = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/concert/my-upcoming-concerts`,
          {  },{withCredentials:true }
          );
        setUpcomingConcerts(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.error("Error fetching concerts:", err);
        setError("Could not fetch concerts");
      }
    };


    useEffect(() => {
        fetchAttendedConcerts();
        fetchConcerts();  
       }, []);


  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 lg:p-8 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Expenditures</h2>

        {/* Show table on medium and up */}
        <div className="hidden sm:block w-full mb-10 overflow-x-auto">
          <table className="w-full min-w-[500px] table-auto border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Item</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Amount (INR)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenditures.map((exp) => (
                <tr key={exp.id} className="border-b">
                  <td className="py-3 px-4 text-gray-800 whitespace-nowrap">{exp.item}</td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">₹{exp.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{exp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Always show chart */}
        <div className="w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Expenditure Chart</h3>
          <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenditures} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="item" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenditurePage;
