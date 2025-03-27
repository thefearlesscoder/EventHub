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

const ChatPage = () => {

  const { user, loading } = useSelector((state) => (state.auth));
  console.log("Chat here -> ", user);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const lastMessageRef = useRef(null);
  const dispatch = useDispatch();

  const [friends, setfriends] = useState([]);

  const fetchfriend = async () => {

    dispatch(setLoading(true));

    try {

      const responce = await axios.post(`${BASE_URL}/friends/my-friends`, {
        userId: user._id
      }, {
        withCredentials: true
      })
      console.log(responce);

      const data = responce?.data;
      if (!data?.success) {
        toast.error("Failed to load friend");
      } else {
        setfriends(data?.data);
      }

    } catch (error) {

    }

    dispatch(setLoading(false));
  }

  useEffect(() => {
    fetchfriend();
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([
      { id: 1, text: "Hey! How are you?", sender: "other" },
      { id: 2, text: "I'm good! What about you?", sender: "me" },
    ]);
    setSidebarOpen(false);
  };

  const resetChatSelection = () => {
    setSelectedUser(null);
    setMessages([]);
  };

  return (

    loading ? (<Spinner />) : (
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
            {
              friends.length > 0 ? (
                friends.map( (user , idx ) => (
                  <div key={idx}
              className="p-3 rounded-lg bg-[#d9d9d9] cursor-pointer hover:bg-[#c9c9c9]"
              onClick={() => handleUserClick(user)}
            >
              {user?.name}
            </div>
                ))
              ) : (
                <div></div>
              )
            }


            {/* <div
              className="p-3 rounded-lg bg-[#d9d9d9] cursor-pointer hover:bg-[#c9c9c9]"
              onClick={() => handleUserClick("John Doe")}
            >
              John Doe
            </div>
            <div
              className="p-3 rounded-lg bg-[#d9d9d9] cursor-pointer hover:bg-[#c9c9c9]"
              onClick={() => handleUserClick("Alice Smith")}
            >
              Alice Smith
            </div> */}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex flex-col flex-1">
          {/* Chat Header */}
          <div className="bg-[#e0e0e0] p-4 flex items-center justify-between">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu className="text-2xl text-[#333]" />
            </button>
            <h2 className="text-lg font-semibold">
              {selectedUser ? `Chat with ${selectedUser.name}` : "Select a user to start chatting"}
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col">
            {
              selectedUser ? (
                messages.map((msg, index) => (
                <div
                  key={msg.id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  className={classNames(
                    "p-3 rounded-lg max-w-xs mb-2",
                    msg.sender === "me" ? "ml-auto bg-[#007bff] text-white" : "bg-[#d9d9d9] text-[#333]"
                  )}
                >
                  {msg.text}
                </div>
              ))
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

    )

  );
};

export default ChatPage;
