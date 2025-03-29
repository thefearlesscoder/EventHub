import React from "react";
import { FaMoneyBillWave } from "react-icons/fa"; // Importing an icon


const Expenditure = () => {
    
  return (
    <div className="mb-5">
      <h2 className="text-3xl text-center font-bold mb-6">Expenditure</h2>
      <div className="bg-white mx-auto shadow-lg hover:shadow-xl rounded-lg p-6 max-w-sm hover:scale-105 transition-shadow duration-300 ease-in-out">
        <div className="flex items-center">
          <div className="text-blue-500 bg-blue-100 p-3 rounded-full">
            <FaMoneyBillWave size={24} /> {/* Icon */}
          </div>
          <div className="ml-4">
            <p className="text-xl text-center font-bold m-6">₹ 5000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenditure;
