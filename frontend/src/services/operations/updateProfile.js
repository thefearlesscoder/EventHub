
import { apiconnector } from "../apiconnector";
import { updateApi } from "../apis";
import { setLoading , setUser } from "../../slices/authSlice" ;
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const { UPDATEPROFILE_API } = updateApi ;

export function updateprofile (
  firstName,
  lastName,
  username ,
  address ,
  phone ,
  navigate , token 
  ) {
    //   const navigate = useNavigate() ;
    return async (dispatch) => {
      // console.log("kunal here")
      // const { token } = useSelector( (state) => state.auth.token ) ;
      console.log( "token -> " , token) ;
    
      dispatch(setLoading(true))
      try {

        // console.log(firstName )
        // console.log(lastName )
        // console.log(username )
        // console.log(address )
        // console.log(phone )
        const response = await apiconnector("POST", UPDATEPROFILE_API , {
          firstName,
          lastName ,
          username ,
          address ,
          phone , 
          token 
        })
  
        console.log("UPDATEPROFILE API RESPONSE............", response)
  
        if (!response?.success) {
            toast.error(response?.message)
          throw new Error(response?.message)
        }else {
            toast.success(response?.message)
            setUser(response?.data) ;
            localStorage.setItem('user' , JSON.stringify(response?.data))
            navigate("/aboutus")
        }
      } catch (error) {
        console.log("profile API ERROR............", error)
        navigate("/update-profile")
      }
      dispatch(setLoading(false))

    }
  }


