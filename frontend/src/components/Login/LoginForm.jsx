import { login } from "../../services/operations/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.js";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser,setToken } from "../../slices/authSlice";
// import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  //google signIN
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      //sending the data to the back end

      const response = await axios.post(
        "http://localhost:5000/api/v1/users/googlesignin",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log("fetch response: ", response.data.AccessToken);
      // toast.success(response.data.message);
      if (response.data.success) {
        console.log("here");
        
        dispatch(setToken(response?.data?.AccessToken));
        dispatch(setUser(response?.data?.user));
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.AccessToken)
        );
        toast.success("Login Successful");

        navigate("/aboutus");
      }
    } catch (error) {
      console.error("Error during Google login", error);
    }
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
            disabled={loading}
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
            <FcGoogle onClick={handleGoogleSignIn} className="cursor-pointer" />
            <FaFacebook className="text-blue-400" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
