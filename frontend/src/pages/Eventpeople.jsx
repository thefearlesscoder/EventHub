import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices/authSlice";
import { set } from "react-hook-form";

import Spinner from "../components/Spinner";

// Expanded dummyUsers array with more users
const dummyUsers1 = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    isFriend: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    isFriend: false,
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    isFriend: false,
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    isFriend: true,
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    isFriend: false,
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    avatar: "https://i.pravatar.cc/150?img=6",
    isFriend: true,
  },
  {
    id: 7,
    name: "George Miller",
    email: "george@example.com",
    avatar: "https://i.pravatar.cc/150?img=7",
    isFriend: false,
  },
  {
    id: 8,
    name: "Hannah Brown",
    email: "hannah@example.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    isFriend: true,
  },
  {
    id: 9,
    name: "Ian Wright",
    email: "ian@example.com",
    avatar: "https://i.pravatar.cc/150?img=9",
    isFriend: false,
  },
  {
    id: 10,
    name: "Julia Roberts",
    email: "julia@example.com",
    avatar: "https://i.pravatar.cc/150?img=10",
    isFriend: true,
  },
];

const PaidUsersPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [friends, setFriends] = useState([]);
  const [ restpeople , setRestpeople ] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  // const { loading } = useSelector((state) => state.auth);
  const [ loading , setLoading ] = useState(false);
  const [ dummyUsers , setMostpeople ] = useState([]);
  const dispatch = useDispatch();
  
  // State to manage the number of visible users
  const [visibleUsers, setVisibleUsers] = useState( Math.min( 8, dummyUsers.length ) );


  const getpeoples = async () => {
    setLoading(true);
    try {
        const response = await axios.post( `${BASE_URL}/concert/get-friends/${id}`,
           {}, {
          withCredentials: true,
        });
        
        const data = response.data?.data ;
        console.log( " responce from eventpeople page -> " , data);

        const updatedUsers = data.myFriendList.map((user) => ({
          ...user,
          isActive: true,
        }));

        console.log("Updated users:", updatedUsers);

        setFriends(updatedUsers);

        const updaterestPeople = data.nonFriendList.map((user) => ({
          ...user,
          isActive: false , 
          isRequest : false 
        }));

        setRestpeople(updaterestPeople);

        console.log("Updated rest people:", updaterestPeople);

        const updatedSentRequests = data.requestFriendList.map((user) => ({
          ...user,
          isActive: false,
          isRequest : true
        }));

        setSentRequests(updatedSentRequests); 
        console.log("Updated sent requests:", updatedSentRequests);

        setMostpeople( [...updatedUsers , ...updaterestPeople , ...updatedSentRequests] );

    } catch (e) {
        console.log(e);
        toast.error("Something went wrong");
    }
    setLoading(false);
  }



  const handlefriendrequest = async(user) => {
    // console.log("Sending friend request to:", user);
    setLoading(true);
    console.log("Sending friend request to:", user._id);
    try {
      const response = await axios.post(
        `${BASE_URL}/friends/request-friend/${user._id}`,{},{
          withCredentials: true,
        }
      );
      
      console.log("Response:", response.data);

      if (response.data.success) {
        console.log("Friend request sent successfully");
        setMostpeople((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, isRequest: true, isActive: false } : u
          )
        );

      } else {
        toast.error("Failed to send friend request");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
    toast.success("Friend request sent successfully");
  }

  const handleSeeMore = () => setVisibleUsers(dummyUsers.length);
  const handleSeeless = () => setVisibleUsers( Math.min( 8, dummyUsers.length ) );

  useEffect(() => { 
    getpeoples();
  }, []);

  console.log("friends", dummyUsers);

  return (
    loading ? ( <div>
      <Spinner/>
    </div> ) : (  

      <div>
      <div className="p-6 bg-richblack-5 min-h-screen">
      <h1 className="md:text-2xl text-xl text-center font-bold mb-6 text-richblack-900">
        People Who Paid for the Event
      </h1>

      {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyUsers.map( (user) => (
            <Card
              key={user._id}
              className="rounded-2xl shadow-md p-4 bg-white sm:p-3 md:p-4"
            >
              <CardContent className="flex flex-col items-center space-y-4">
                <img
                  src={user?.image?.url}
                  alt={user.name}
                  className="w-20 h-20 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full object-cover"
                />
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-richblack-800 sm:text-md md:text-lg">
                    {user.name}
                  </h2>
                  <p className="text-sm text-pure-greys-400 sm:text-xs md:text-sm">
                    {user.email}
                  </p>
                </div>

                <div>
                    {
                      user.isActive ? (
                        <div>
                          <button
                            onClick={() => { navigate("/chat")}}
                            className={`mt-4 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                              "bg-blue-200 hover:bg-blue-300"
                            }`}
                          >
                            Navigate
                          </button>

                        </div>
                      ) : (

                        user.isRequest ? ( <div>
                          <button
                            onClick={() =>{}}
                            className={`mt-4 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                              "bg-caribbeangreen-200 hover:bg-caribbeangreen-300"
                            }`}
                          >
                           Request Send
                          </button>
                        </div>) : ( <div>
                          <button
                            onClick={() => handlefriendrequest(user)}
                            className={`mt-4 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                              "bg-caribbeangreen-200 hover:bg-caribbeangreen-300"
                            }`}
                          >
                            Send Friend Request
                          </button>
                        </div> )
                        
                      )
                    }

                </div>

                
              </CardContent>
            </Card>
          ))}
        </div>
      
        <div> 

          {
              dummyUsers.length > 8 ?  ( <div>
                  {visibleUsers < dummyUsers.length && (
                    <div className="text-center mt-6">
                      <button
                        onClick={handleSeeMore}
                        className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
                      >
                        See More
                      </button>
                    </div>
                  )}
                  {visibleUsers === dummyUsers.length && (
                    <div className="text-center mt-6">
                      <button
                        onClick={handleSeeless}
                        className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
                      >
                        View Less
                      </button>
                    </div>
                  )}

              </div> ) : ( <div></div> ) 
          }
        </div>

      {/* See More button */}
      
    </div>
      </div>
        )
  );

};

export default PaidUsersPage;
