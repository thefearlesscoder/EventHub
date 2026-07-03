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

const ExpenditurePage = () => {

  const [AttendedEvents, setAttendedConcerts] = useState([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState([]);
  const [dynamicExpenditures, setDynamicExpenditures] = useState([]);
  let { user } = useSelector((state) => state.auth);

  const fetchAttendedConcerts = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/concert/my-attended-concerts`,
        {},
        { 
          withCredentials: true
        }
      );
      setAttendedConcerts(response.data.data || []);
    } catch (err) {
      console.error("Error fetching attended concerts:", err);
    }
  };

  const fetchConcerts = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/concert/my-upcoming-concerts`,
        {},
        { 
          withCredentials: true
        }
      );
      setUpcomingConcerts(response.data.data || []);
    } catch (err) {
      console.error("Error fetching concerts:", err);
    }
  };

  useEffect(() => {
    fetchAttendedConcerts();
    fetchConcerts();
  }, []);

  useEffect(() => {
    // Combine both lists and remove duplicates (if any) based on concert ID
    const allConcerts = [...AttendedEvents, ...upcomingConcerts];
    const uniqueMap = new Map();
    allConcerts.forEach((concert) => {
      if (concert && concert._id) {
        uniqueMap.set(concert._id, concert);
      }
    });

    const combinedConcerts = Array.from(uniqueMap.values());

    const newExpenditures = combinedConcerts.map((concert, index) => {
      // Format date to YYYY-MM-DD
      const dateStr = concert.date
        ? new Date(concert.date).toISOString().split("T")[0]
        : "N/A";
      
      return {
        id: concert._id || index,
        item: `Ticket: ${concert.artist || "Concert"}`,
        amount: concert.ticketPrice || 0,
        date: dateStr,
      };
    });

    setDynamicExpenditures(newExpenditures);
  }, [AttendedEvents, upcomingConcerts]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 lg:p-8 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Expenditures</h2>

        {dynamicExpenditures.length === 0 ? (
          <p className="text-gray-600 mb-6">You have no recorded expenses yet. Buy a ticket to see your chart!</p>
        ) : (
          <>
            {/* Show table on medium and up */}
            <div className="hidden sm:block w-full mb-10 overflow-x-auto">
              <table className="w-full min-w-[500px] table-auto border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Item
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Amount (INR)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dynamicExpenditures.map((exp) => (
                    <tr key={exp.id} className="border-b">
                      <td className="py-3 px-4 text-gray-800 whitespace-nowrap">
                        {exp.item}
                      </td>
                      <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                        ₹{exp.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                        {exp.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Always show chart */}
            <div className="w-full">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Expenditure Chart
              </h3>
              <div className="w-full h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dynamicExpenditures}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="item" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenditurePage;
