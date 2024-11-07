import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return <div className="min-h-screen">
    Welcome to Dasboard.
    <Link to={'/create-concert'}>
        concert
    </Link></div>;
};

export default Dashboard;
