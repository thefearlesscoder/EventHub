import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { FiSend, FiMenu } from "react-icons/fi";
import { IoMdChatbubbles } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../services/apis";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../slices/authSlice";
import Spinner from "../components/Spinner";
import { io } from "socket.io-client";
import { ChevronsLeftIcon } from "lucide-react";

const ENPOINT = "http://localhost:4000";
var socket , newchat ;

const ChatPage = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const lastMessageRef = useRef(null); // Reference to last message
  const [chat, setChat] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const dispatch = useDispatch();
  newchat = chat ;

  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${BASE_URL}/friends/my-friends`,
        {
          userId: user._id,
        },
        {
          withCredentials: true,
        }
      );
      const data = response?.data;
      if (!data?.success) {
        toast.error("Failed to load friends");
      } else {
        setFriends(data?.data);
        console.log( "friend -> " , data?.data ) ;
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  const messagesEndRef = useRef(null);

useEffect(() => {
  // Scroll to the bottom whenever messages change
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  // Initialize socket connection
  console.log("user ->> " ,user)
  
  useEffect(() => {
    handleUserClick(selectedUser);
    socket = io(ENPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

  }, [selectedUser]);


  useEffect(() => {
    const messageListener = (gotmessage) => {
      console.log("Message received:", gotmessage);
  
      if (newchat?._id !== gotmessage.chat._id) return;
  
      setMessages((prevMessages) => {
        // Check if the received message already exists in the previous messages
        const isDuplicate = prevMessages.some((msg) => msg._id === gotmessage._id);
      
        if (!isDuplicate) {
          return [...prevMessages, gotmessage]; // Add only if not duplicate
        }
        
        return prevMessages; // Otherwise, return the previous state unchanged
      });
      
      
    };
  
    socket.on("messagerecieve", messageListener);
  
    // Cleanup function to remove listener when component re-renders
    return () => {
      socket.off("messagerecieve", messageListener);
    };
  }, [newchat]); // Depend on newchat so it updates when chat changes
  



  

  // Fetch friends on initial load
  useEffect(() => {
    fetchFriends();
  }, []);

  // Handle sending messages
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/message/sendmessage`,
        {
          content: newMessage,
          chatId: chat._id,
        },
        {
          withCredentials: true,
        }
      );
      const newMessageData = response?.data;

      // Emit the new message via socket
      socket.emit("newmessages", newMessageData);
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      // Clear the input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle user selection for chatting
  const handleUserClick = async (user) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${BASE_URL}/chat/accesschat`,
        { userId: user.friendId },
        { withCredentials: true }
      );

      const chatData = res?.data;
      setChat(chatData);
      newchat = chatData ;
      const messageResponse = await axios.get(`${BASE_URL}/message/${chatData._id}`, {
        withCredentials: true,
      });

      setMessages(messageResponse?.data);
      socket.emit("joinchat", chatData._id);
    } catch (error) {
    }
    dispatch(setLoading(false));
    setSidebarOpen(false);
  };

  // Reset chat selection
  const resetChatSelection = () => {
    setSelectedUser(null);
    setMessages([]);
  };

  

  // // Auto-scrolling effect
  // useEffect(() => {
  //   if (lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex h-screen bg-[#f8f9fa] text-[#333]">
      {/* Sidebar */}
      <div
        className={classNames(
          "fixed md:relative md:w-64 bg-[#e0e0e0] p-4 transition-transform duration-300 h-full z-10",
          sidebarOpen ? "translate-x-0 w-full md:w-64" : "-translate-x-64 md:translate-x-0"
        )}
      >
        <h2
          className="text-xl font-bold mb-4 flex items-center gap-2 cursor-pointer text-[#333]"
          onClick={resetChatSelection}
        >
          <IoMdChatbubbles className="text-[#007bff]" /> Chats
        </h2>
        <div className="space-y-2">
          {friends.length > 0 ? (
            friends.map((friend, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#d9d9d9] cursor-pointer hover:bg-[#c9c9c9]"
                onClick={() => setSelectedUser(friend)}
              >
                {friend?.name}
              </div>
            ))
          ) : (
            <div>No friends found.</div>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <div className="bg-[#e0e0e0] p-4 flex items-center justify-between">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu className="text-2xl text-[#333]" />
          </button>
          <h2 className="text-lg font-semibold">
            {selectedUser ? `Chat with ${selectedUser.name}` : "Select a user to start chatting"}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col">
  {user && selectedUser ? (
    messages.length > 0 ? (
      <>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={classNames(
              "p-3 rounded-lg max-w-xs mb-2",
              msg.sender._id === user._id
                ? "ml-auto bg-[#007bff] text-white"
                : "bg-[#d9d9d9] text-[#333]"
            )}
          >
            {msg?.content}
          </div>
        ))}

        {/* Invisible div to keep scroll position at the bottom */}
        <div ref={messagesEndRef}></div>
      </>
    ) : (
      <div className="text-gray-500 animate-pulse text-center text-lg mt-10">
        No messages, start a conversation!
      </div>
    )
  ) : (
    <div className="text-gray-500 animate-pulse text-center text-lg mt-10">
      No chat selected. Pick a user to start a conversation!
    </div>
  )}
</div>


        {/* Input Box */}
        {selectedUser && (
          <div className="bg-[#e0e0e0] p-4 flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 bg-[#ffffff] rounded-lg text-[#333] border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-[#007bff] p-2 rounded-lg">
              <FiSend className="text-white text-lg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
