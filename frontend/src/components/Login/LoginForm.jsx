import { login } from "../../services/operations/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";


function LoginForm() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLoginWithGoogle = async (credentialResponse) => {
    if (credentialResponse?.credential) {
      console.log("Google Login Success:", credentialResponse);

      // Extract token
      const token = credentialResponse.credential;

      console.log(token);
      
      // Send token to backend for verification
      try {
        const res = await axios.post("http://localhost:5000/api/auth/google", {
          token,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log("Backend Response:", data);
        // Handle user authentication (e.g., save user data to state/context)

      } catch (error) {
        console.error("Error sending token to backend:", error);
      }
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };


  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-semibold">Login</h3>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 ">
              <input
                type="email"
                autoComplete="on"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 ">
              <input
                type="password"
                autoComplete="on"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-md transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="mt-4 text-center">
            <Link
              to={"/forgot-password"}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </div>
          <div className=" flex gap-5 md:text-4xl text-2xl font-bold p-4 justify-center">
            <GoogleLogin 
            onSuccess={handleLoginWithGoogle}
            onError={() => { return toast.error("Google SignIn Failed")}}/>
            {/* <FaFacebook className="text-blue-400" /> */}
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
