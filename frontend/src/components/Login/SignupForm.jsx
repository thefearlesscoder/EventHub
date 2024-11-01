import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signUp } from "../../services/operations/auth"


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
  

  return (
    <div className="">
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 mt-8 mb-8 text-left p-2">
        <div className=" flex gap-x-14 md:flex-row flex-col gap-y-3 items-center">
            <div className="text-richblack-25 bg-richblack-600 p-3 h-fit font-bold rounded-full  w-[40%]
                    md:w-[20%] md:ml-[10%] md:mr-[10%] cursor-pointer flex items-center justify-center " onClick={handleclick}>
              {
                boolrole ? 
                  ( <div>
                      Admin
                  </div>) : (<div>
                      User
                  </div>)
              }
            </div>
            <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-left text-richblack-5">
                  User Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  autoComplete="on"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleOnChange}
                  placeholder="Enter a unique Username"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                />
              </label>
        </div>
        <div className="flex gap-x-4 md:flex-row flex-col gap-y-3 w-full">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]  text-left text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              autoComplete="on"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              autoComplete="on"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            autoComplete="on"
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4 md:flex-row flex-col gap-y-3">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              autoComplete="on"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              autoComplete="on"
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 "
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
        
          className="mt-6 rounded-[8px] font-bold bg-yellow-50 py-[8px] px-[12px]  text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm