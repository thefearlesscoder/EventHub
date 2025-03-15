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

const Concert = () => {
  const { id } = useParams();
  let { token , user } = useSelector((state) => state.auth);
  const [concertdetails, setconcdetails] = useState("");
  const [loading, setLoading] = useState(false);
    // user = JSON.parse(user) ;
    // token = JSON.parse(token) ;

    
  const searchConcert = async () => {
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
  };

  useEffect(() => {
    searchConcert();
  }, [id]);

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

  console.log(user) ;

  return (
    // <div></div>
    <div className="min-h-screen">
      <div className=" p-10 ">
        <div className=" font-bold md:text-2xl text-xl ml-[10%] ">
          Home / Concert-Details
        </div>

        <div className=" relative rounded-md p-10  min-h-screen ">
          <div className=" relative ">
            <img
              src={bg2}
              className=" w-full md:h-[400px] rounded-xl object-fill"
            ></img>
            <img
              src={centreicon}
              className=" w-[30%]  rounded-full absolute aspect-square 
                        object-cover md:bottom-[-120px] bottom-[-40px] left-[35%]"
            ></img>
          </div>

          <div
            className=" md:pt-[200px] pt-[60px] flex gap-10 items-center justify-between 
                    md:flex-row flex-col md:text-auto text-center"
          >
            <div className=" flex flex-col font-bold md:text-4xl text-2xl gap-4">
              <div className=" md:text-8xl text-4xl ">
                {concertdetails.artist}
              </div>
              <div>{formattedDate}</div>
            </div>
            <div className=" flex flex-col  text-2xl ">
              <div className="font-bold text-4xl">Place And Organizer</div>
              <div className=" pt-2">Jabalpur</div>
              <div className=" flex gap-2 justify-center flex-col">
                <div>kunal sonkar</div>
                <div>9755763762</div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col font-bold md:text-4xl text-4xl mt-14 mx-auto text-center ">
            Description
            <div className=" font-medium text-2xl w-[90%] mx-auto mt-5">
              {concertdetails.description}
            </div>
          </div>

          <div className=" flex justify-around mt-14 w-full md:flex-row flex-col gap-5 items-center ">
            <div className=" font-bold text-4xl flex justify-center flex-col items-center md:text-auto text-center">
              <div>
                AvailableSeat -{" "}
                <span className="font-normal">
                  {concertdetails.seatingCapacity}
                </span>
              </div>
              <div className="font-bold flex gap-2 items-center md:text-auto text-center">
                Price{" "}
                <div className="font-normal flex gap-2">
                  {" "}
                  - <FaRupeeSign /> {concertdetails.ticketPrice}
                </div>
              </div>
            </div>
            <div
              className={` w-[40px] h-[40px] 
                    rounded-full aspect-auto ${
                      concertdetails.seatingCapacity > 0
                        ? "bg-caribbeangreen-600"
                        : "bg-pink-400"
                    } `}
            ></div>
          </div>

          <div className=" mx-auto mt-14 md:w-[30%] w-full flex justify-around md:flex-row flex-col md:items-center items-center md:gap gap-5 ">
            <button
              onClick={() => {
                navigate("/concert");
              }}
              className=" flex gap-2 w-fit items-center p-4 bg-yellow-50 text-black  font-bold rounded-lg text-xl "
            >
              Explore More <FaArrowRight />
            </button>
            <button
              onClick={commonfun}
              className=" flex gap-2 w-fit items-center bg-blue-300 text-white p-4 font-bold rounded-lg text-xl "
            >
              Register <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concert;
