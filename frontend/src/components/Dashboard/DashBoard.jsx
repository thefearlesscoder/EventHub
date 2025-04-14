import { Link, Outlet } from "react-router-dom";
import { Calendar, UserCircle, DollarSign, PlusCircle, Users } from "lucide-react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { loading, user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="" className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <Calendar size={20} />
            <span>Events</span>
          </Link>
          <Link to="profile" className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <UserCircle size={20} />
            <span>Profile</span>
          </Link>
          <Link to="expenditure" className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <DollarSign size={20} />
            <span>Expenditure</span>
          </Link>
          <Link to="friend" className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <Users size={20} />
            <span>Friend</span>
          </Link>
          {user?.role === "admin" && (
            <Link to="create-event" className="flex items-center space-x-2 text-gray-600 cursor-pointer">
              <PlusCircle size={20} />
              <span>Create Event</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full p-6 flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
