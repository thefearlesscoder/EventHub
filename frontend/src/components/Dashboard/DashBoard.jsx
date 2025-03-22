import React, { useState } from "react";
import { Calendar, UserCircle, DollarSign, PlusCircle } from "lucide-react";

import EventsPage from "./Eventsection";    

import Profile from "../../pages/Profile";
import ExpenditurePage from "./Expenditure";
import { useSelector } from "react-redux";
import CreateConcert from "../../pages/CreateConcert";


const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 500 },
  { name: "Apr", uv: 200 },
  { name: "May", uv: 700 },
];


const Dashboard1 = () => {
    const [ num , setnum ] = useState(1);

    const { loading } = useSelector((state) => state.auth);
    
    const handleclick = (val) => {  
        setnum(val) ;
    }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-gray-600 cursor-pointer" onClick={() => handleclick(1)}>
            <Calendar size={20} />
            <span>Events</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 cursor-pointer" onClick={() => handleclick(2)}>
            <UserCircle size={20} />
            <span>Profile</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 cursor-pointer" onClick={() => handleclick(3)}>
            <DollarSign size={20} />
            <span>Expenditure</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 cursor-pointer" onClick={() => handleclick(4)}>
            <PlusCircle size={20} />
            <span>Create Event</span>
          </div>
        </nav>
      </div>

      <div className="w-full p-6">
        {
          num === 1 ? <EventsPage /> :
          num === 2 ? <Profile /> :
          num === 3 ? <ExpenditurePage /> :
          <CreateConcert/>
        }
      </div>
    </div>

  );
}

export default Dashboard1 ;
