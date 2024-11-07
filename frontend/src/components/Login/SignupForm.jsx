import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../../services/operations/auth"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa";

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username:"",
  })

  const [ role , setrole ] = useState("user") ;
  const [ boolrole , setboolrole ] = useState(true) ;
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword , username } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
    console.log(formData) 
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(firstName , lastName , email , password , confirmPassword , role , username ,navigate ));
  }

  const handleclick = () => {
      setboolrole(!boolrole) ;

      if ( role == "user" ) {
          setrole("admin") 
      }else {
        setrole("user")
      }
      console.log(role) ;
  }
  
  const { loading } = useSelector( (state) => (state.auth))

  return (
    <section className="flex items-center justify-center  bg-gray-100 mx-auto m-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold">Create a new account</h3>
          </div>
          <form onSubmit={handleOnSubmit} className="">
              <div className=" flex items-center justify-center">
                <div className="text-black border border-black  p-3 h-fit font-bold rounded-full  w-[40%]
                        md:w-[20%]  cursor-pointer flex items-center justify-center mb-4 " onClick={handleclick}>
                  {
                    boolrole ? 
                      ( <div>
                          User
                      </div>) : (<div>
                          Admin
                      </div>)
                  }
                </div>

              </div>
            <div className="mb-4 ">
              <label className="block text-gray-700 mb-2">UserName</label>
              <div className="flex items-center border border-gray-300 ">
                <input
                  type="text"
                  autoComplete="on"
                  placeholder="Your User Name"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                  className="flex-1 p-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">FristName</label>
              <div className="flex items-center border border-gray-300 ">
                <input
                  autoComplete="on"
                  type="text"
                  placeholder="Your First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleOnChange}
                  className="flex-1 p-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">LastName</label>
              <div className="flex items-center border border-gray-300 ">
                <input
                  type="text"
                autoComplete="on"
                  placeholder="Your Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleOnChange}
                  className="flex-1 p-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center border border-gray-300 ">
                <input
                  type="email"
                autoComplete="on"
                  placeholder="youremail@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  className="flex-1 p-2 focus:outline-none"
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
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  className="flex-1 p-2 focus:outline-none"
                />
        
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <div className="flex items-center border border-gray-300">
                <input
                  type="password"
                autoComplete="on"
                  placeholder="Your Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleOnChange}
                  className="flex-1 p-2 focus:outline-none"
                />
              
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
            <div className="mt-4 text-center">
              <Link to={"/login"} className="text-blue-500 hover:underline">
                Login Now
              </Link>
            </div>
            <div className=" flex gap-5 md:text-4xl text-2xl font-bold p-4 justify-center">
                  <FcGoogle  className="cursor-pointer"/>
                    <FaFacebook className="text-blue-400"/>
              </div>
          </form>
        </div>
      </section>
  )
}

export default SignupForm