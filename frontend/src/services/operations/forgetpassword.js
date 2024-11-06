
import { apiconnector } from "../apiconnector";
import { authApi } from "../apis";
import { setLoading  } from "../../slices/authSlice" ;
import { toast } from "react-hot-toast";

const { FORGET_API , RESET_PASSWORD} = authApi ;

export function ForgotPassword (
  email , 
  navigate 
  ) {

    return async (dispatch) => {
    
      dispatch(setLoading(true))
      try {
        const response = await apiconnector("POST", FORGET_API , {
          email
        })
  
        console.log("FORGOT PASSWORD API RESPONSE............", response)
  
        if (!response?.success) {
            toast.error(response?.message)
          throw new Error(response?.message)
        }else {
            toast.success(response?.message)
            navigate("/login")
        }
      } catch (error) {
        console.log("profile API ERROR............", error)
        navigate("/forgot-password")
      }
      dispatch(setLoading(false))

    }
  }

export function ResetPassword (
    password , 
    confirmPassword ,
    token ,
    navigate 
    ) {
  
      return async (dispatch) => {
      
        dispatch(setLoading(true))
        try {
          const response = await apiconnector("POST", `${RESET_PASSWORD}/${token}` , {
            password ,
            confirmPassword
          })
    
          console.log("RESET PASSWORD API RESPONSE............", response)
    
          if (!response?.success) {
              toast.error(response?.message)
            throw new Error(response?.message)
          }else {
              toast.success(response?.message)
              navigate("/login")
          }
        } catch (error) {
          console.log("RESEt API ERROR............", error)
          navigate("/forgot-password")
        }
        dispatch(setLoading(false))
  
      }
    }