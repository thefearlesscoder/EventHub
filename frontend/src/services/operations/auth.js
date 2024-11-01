
import { apiconnector } from "../apiconnector";
import { authApi } from "../apis";
import { setLoading } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { Toast } from "react-hot-toast";
// import { toast } from "react-toastif";

const { SIGNUP_API } = authApi  ;

// user registration 
export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role ,
    username,
    navigate
    ) {
    //   const navigate = useNavigate() ;
    return async (dispatch) => {
      
      dispatch(setLoading(true))
      try {
        const response = await apiconnector("POST", SIGNUP_API, {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role ,
            username
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response?.success) {
          throw new Error(response?.message)
        }else {
            toast.success("Signup Successful")
            navigate("/login")
        }
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error()
        navigate("/signup")
      }
      dispatch(setLoading(false))

    }
  }