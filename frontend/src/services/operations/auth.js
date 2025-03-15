
import { apiconnector } from "../apiconnector";
import { authApi } from "../apis";
import { setLoading, setUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { Toast } from "react-hot-toast";
import { setToken } from "../../slices/authSlice";
import axios from "axios";

const { SIGNUP_API , LOGIN_API  , LOGOUT_API } = authApi  ;

// user registration 
// export function googleLogin(
//     firstName,
//     lastName,
//     email,
//     role,
//     username,
//     navigate
//     ) {
//     //   const navigate = useNavigate() ;
//     return async (dispatch) => {
      
//       dispatch(setLoading(true))
//       try {
//         const response = await apiconnector("POST", SIGNUP_API, {
//           firstName,
//           lastName,
//           email,
//           role,
//             username
//         })
  
//         console.log("SIGNUP API RESPONSE............", response)
  
//         if (!response?.success) {
//             toast.error(response?.message)
//           throw new Error(response?.message)
//         }else {
//             toast.success("Signup Successful")
//             navigate("/login")
//         }
//       } catch (error) {
//         console.log("SIGNUP API ERROR............", error)
//         navigate("/signup")
//       }
//       dispatch(setLoading(false))

//     }
//   }

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
        let response = await axios.post( SIGNUP_API, {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role ,
            username
        }, { withCredentials : true }) ;
  
        console.log("SIGNUP API RESPONSE............", response)
        response = response?.data 
        console.log("SIGNUP API RESPONSE............", response)
        if (!response?.success) {
            toast.error(response?.message)
          throw new Error(response?.message)
        }else {
            toast.success("Signup Successful")
            navigate("/login")
        }
      } catch (error) {
        // let message = error.response?.data ;
        console.log("SIGNUP API ERROR............", error.response?.data)
        toast.error (error.response?.data.message) ;
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
        let response = await axios.post(LOGIN_API , {
          email,
          password,
        },{
          withCredentials : true 
        })
  
        console.log("LOGIN API RESPONSE...¸č.........", response)
        response = response?.data 
        console.log("LOGIN API RESPONSE...¸č.........", response)

        if (!response?.success) {
            toast(response?.message)
          throw new Error(response?.message)
        }else {
            dispatch(setToken(response?.data?.AccessToken ))
            dispatch(setUser(response?.data?.user )) ;
            localStorage.setItem('user' , JSON.stringify(response?.data?.user)) ;
            localStorage.setItem('token' , response?.data?.AccessToken) ;
            toast.success("Login Successful")
            navigate("/dashboard")
        }
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        // toast.error()
        navigate("/login")
      }
      dispatch(setLoading(false))

    }
  }

  export function logout(navigate) {
    return async (dispatch) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      dispatch(setToken(null))
      dispatch(setUser(null))

      const response = await axios.post ( LOGOUT_API , {} , {withCredentials : true }) ;

      toast.success("Logged Out")
      navigate("/")
    }
}
