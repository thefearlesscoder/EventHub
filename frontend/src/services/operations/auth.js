
import { apiconnector } from "../apiconnector";
import { authApi } from "../apis";
import { setLoading, setUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { Toast } from "react-hot-toast";
// import { toast } from "react-toastif";
import { setToken } from "../../slices/authSlice";

const { SIGNUP_API , LOGIN_API } = authApi  ;

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
            toast.error(response?.message)
          throw new Error(response?.message)
        }else {
            toast.success("Signup Successful")
            navigate("/login")
        }
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        navigate("/signup")
      }
      dispatch(setLoading(false))

    }
  }


  export function login (
    email,
    password,
    navigate
    ) {
    //   const navigate = useNavigate() ;
    return async (dispatch) => {
      
      dispatch(setLoading(true))
      try {
        const response = await apiconnector("POST", LOGIN_API , {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response?.success) {
            toast(response?.message)
          throw new Error(response?.message)
        }else {
            dispatch(setToken(response?.data?.AccessToken ))
            dispatch(setUser(response?.data?.user )) ;
            localStorage.setItem('user' , JSON.stringify(response?.data?.user)) ;
            toast.success("Login Successful")
            navigate("/aboutus")
        }
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        // toast.error()
        navigate("/login")
      }
      dispatch(setLoading(false))

    }
  }