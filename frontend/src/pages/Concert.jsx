import React, { useEffect, useState } from "react";
import bg2 from "../assets/Images/bg2.jpg";
import centreicon from "../assets/Images/centreicon.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BASE_URL } from "../services/apis";
import logo from "../assets/event.jpg";


const Concert = () => {
  const { id } = useParams();
  let { token , user } = useSelector((state) => state.auth);
  const [concertdetails, setconcdetails] = useState("");
  const [loading, setLoading] = useState(false);
    // user = JSON.parse(user) ;
    // token = JSON.parse(token) ;

    
  const searchConcert = async () => {

    setLoading(true);
    try {
      let response = await axios.post(
        `${BASE_URL}/concert/concert/${id}`,{},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true ,
        }
      );
      
      console.log("concert responce -> " ,response)
      response = response?.data ;
      
      if (!response.success ) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      console.log("concert responce -> " ,response)

      setconcdetails(response.data);
      console.log("Concert data:", response.data);
      console.log(concertdetails);
    } catch (error) {
      console.error("Error fetching concert:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchConcert();
  }, [] );

  const date = new Date(concertdetails.date);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  console.log(formattedDate);

  const navigate = useNavigate();

    const addingDetails = async () => {
    try {
        console.log(`Requesting with id: ${id} and token: ${token}}`);

      

        const response = await axios.post(
        `${BASE_URL}/concert/register-for-concert/${id}`,
          {},
        {
            withCredentials:true ,
        }
        );

        
        console.log("heeloooooo") ;
        // toast.success("Data updated successfully");
        console.log("Response data buy  concert: - >> ", response.data);
        
        if ( response?.data?.success )
            await makePayment() ;
        // navigate(`/register-succes/${id}`);
    } catch (error) {
        console.error("Error in adding details:", error.message);
        toast.error("All ready you have registered ");
    }
    };


  // payment integration
  
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51QJ5RTAI8xVNoO7TqaukjHHfkOi5Nj0OPYYTToUwQkjukxrZ3RH0QZ92gH1bvqyUlxevQAz0hIHqkSomC1FFrPtQ00CCVZnGM8"
      );

      const body = {
        concert: concertdetails,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${BASE_URL}/concert/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
          credentials: "include" 
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      // console.log(response) ;
      const session = await response.json();
      console.log("Session object:", session); // Debug: Check session data

      if (!session.id) {
        throw new Error("Session ID is missing in the response");
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      // console.log(result)
      if (result.error) {
        console.error(result.error.message);
      }
      
      // addingDetails() ;
      // navigate(session.session_url) ;
    } catch (error) {
      console.error("Error:", error);
    }

    // toast.success("Payment Success");
  };

  const commonfun = async () => {
    // makePayment() ;
    if (token == null || token == undefined ) {
        toast.error("You need to login") ;
    }else {

      const res = await addingDetails();
      
        // await makePayment() ;
        // navigate(`/register-succes/${id}`);
        // toast.success("Registed successfull");
    }
  };

  console.log("Concert details:", concertdetails);
  console.log(user) ;

  return (
    // <div></div>
    
        loading ? <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
      </div>:
        <div> 
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-8">
              {/* Event Banner */}
              <div className="relative h-64 sm:h-80 md:h-[400px] rounded-lg overflow-hidden">
                <img
                  src={logo}
                  alt="Conference at EFLU"
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 right-4 bg-white text-black text-sm sm:text-base font-semibold px-3 py-1 rounded-md shadow">
                  Upcoming
                </div>
              </div>
      
              {/* Title & Organizer */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Event at {concertdetails.place}
                </h1>

                {concertdetails.addedBy ? (
                  <p className="text-gray-500 text-sm sm:text-base">
                    Organized by {concertdetails.addedBy.firstName}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm sm:text-base">
                    Organizer info not available
                  </p>
                )}

                </div>
              </div>
      
              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Section */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">About this event</h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {concertdetails.description}
                    </p>
                  </div>
      
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">Attendees</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                      {Array.isArray(concertdetails?.peoples) && concertdetails.peoples.length > 0 ? (
                        <>
                          {concertdetails.peoples.slice(0, 3).map((person, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold">
                                {person?.firstName?.charAt(0).toUpperCase() || '?'}
                              </span>
                              <span>{person?.firstName || 'Unknown'}</span>
                            </div>
                          ))}

                          {concertdetails.peoples.length > 0 && (
                            <button
                              onClick={() => navigate(`/concert/people/${concertdetails?._id}`)}
                              className="md:w-[20%] md:ml-5 sm:md-[50%] w-full h-10 bg-black text-white text-sm font-medium rounded-md hover:bg-zinc-900 transition"
                            >
                              Show More
                            </button>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-gray-400">No attendees found</p>
                      )}
                    </div>
                  </div>

                </div>
      
                {/* Right Section */}
                <div className="space-y-6">
                  <div className="border rounded-lg p-6 space-y-5">
                    <div className="inline-flex items-center rounded-md bg-black text-white text-xs font-semibold px-3 py-1">
                      Other
                    </div>
      
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <svg
                        className="w-5 h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 2v4M16 2v4M3 10h18M3 4h18v16H3z" />
                      </svg>
                      <span>{formattedDate}</span>
                    </div>
      
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <svg
                        className="w-5 h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2a8 8 0 0 1 8 8c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 8-8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{concertdetails.place}</span>
                    </div>
      
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <svg
                        className="w-5 h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{concertdetails?.peoples?.length || 0}
                      / 100 attendees</span>
                    </div>
                    <div>
                      {
                        concertdetails?.peoples?.some(p => p._id === user._id) ? (
                          <button onClick={ () => { navigate(`/navigate/${concertdetails._id}`)}} className="w-full h-10 bg-black text-white text-sm font-medium rounded-md hover:bg-zinc-900 transition">
                            Navigate
                          </button>
                        ) : (
                          <button onClick={commonfun} className="w-full h-10 bg-black text-white text-sm font-medium rounded-md hover:bg-zinc-900 transition">
                            Attend Event
                          </button>
                        )
                      }
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
    


  );
};

export default Concert;
