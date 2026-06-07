import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/auth";  

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ];

  const authLinks = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/signup" },
  ];



  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Chat" , path: "/chat"},
  ];

  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const dispatch = useDispatch () ;
  const navigate = useNavigate() ;
  const handleclick = () => {
    console.log("click") ;
    setIsOpen(false)
    dispatch(logout(navigate)) ;
  }

  return (
    <nav className="border-b bg-gray-900  dark:bg-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Main Links */}
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-bold text-primary">EventHub</div>
            <div className="hidden md:flex space-x-6">
              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary font-medium"
                >
                  {link.name}
                </Link>
              ))}

              {
                user ? (<Link

                  to={"/dashboard"}
                  className="text-muted-foreground hover:text-primary font-medium"
                >
                  Dashboard
                </Link>) : (<div />)
              }
              {
                user ? (<Link

                  to={"/chat"}
                  className="text-muted-foreground hover:text-primary font-medium"
                >
                  Chat
                </Link>) : (<div />)
              }
            </div>
          </div>

          {/* Auth Links on Desktop */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ?
              (<div

                onClick={handleclick}

                className="bg-black text-white font-bold hover:bg-black/90 px-4 py-2 h-9 text-sm cursor-pointer rounded-md shadow transition-colors"
              >
                LogOut
              </div>

              ) : (<div>
                <Link
                  to="/login"
                  className="hover:bg-accent hover:text-accent-foreground px-4 py-2 h-9 text-sm font-bold rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-black text-white font-bold hover:bg-black/90 px-4 py-2 h-9 text-sm rounded-md shadow transition-colors"
                >
                  Register
                </Link>
              </div>)}




          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-primary p-2 rounded"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - Slide from Right */}
      <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
      className="fixed top-0 right-0 w-3/4 h-full bg-white dark:bg-gray-900 z-50 shadow-lg px-6 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Menu</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-primary"
        >
          <X size={24} />
        </button>
      </div>

      {user ? (
        <div className="space-y-4">
          {[...mainLinks, ...userLinks].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-muted-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}

          <div
            onClick={handleclick}
            className="block text-base font-medium text-muted-foreground hover:text-primary"
          >
            Logout
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {[...mainLinks, ...userLinks, ...authLinks].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-muted-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  )}
</AnimatePresence>


    </nav>
  );
};

export default Navbar;
