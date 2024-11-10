import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";

// npm install @heroicons/react@v1 // check it

function PaymentSuccessPage() {
  const { id } = useParams() ;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-2xl border border-gray-200
         transform transition-all hover:scale-105">
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mb-6 text-caribbeangreen-600" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>
          <Link to={"/dashboard"}>
            <button className="mt-4 px-6 py-2 bg-green-500 text-black font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none transition-colors duration-300">
              Go to Dashboard
            </button>
          </Link>

          <Link to={`/concert/${id}/people`}>
            <button className="mt-4 px-6 py-2 bg-green-500 text-black font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none transition-colors duration-300">
              Find More People
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
