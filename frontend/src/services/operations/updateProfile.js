
import { apiconnector } from "../apiconnector";
import { BASE_URL, updateApi } from "../apis";
import { setLoading, setUser, setToken } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

const { UPDATEPROFILE_API, UPDATE_IMAGE } = updateApi;

export function updateprofile (
  firstName,
  lastName,
  username,
  address,
  phone,
  navigate
) {
  //   const navigate = useNavigate() ;
  return async (dispatch) => {
    // console.log("kunal here")
    // const { token } = useSelector( (state) => state.auth.token ) ;
    // console.log("token -> ", token);

    dispatch(setLoading(true))
    try {

      let response = await axios.post( UPDATEPROFILE_API, {
        firstName,
        lastName,
        username,
        address,
        phone
      },{ withCredentials : true })

      console.log("UPDATEPROFILE API RESPONSE............", response)
      response = response?.data ;
      if (!response?.success) {
        toast.error(response?.message)
        throw new Error(response?.message)
      } else {
        toast.success(response?.message)
        // setUser(response?.data?.data) ;
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response?.data))
        // navigate("/ab")
        setUser(response?.data);
        navigate('/')
      }
    } catch (error) {
      console.log("profile API ERROR............", error)
      navigate("/update-profile")
    }
    dispatch(setLoading(false))

  }
}


export function updateImage(formData, formData1 , navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      console.log("bmncbskd");
      console.log("FormData content:", [...formData.entries()]);

      let response = await axios.post(`${BASE_URL}/users/update-image`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("UPDATEIMAGE API RESPONSE:", response.data.user);
        setToken(response?.data?.user?.AccessToken);
        setUser(response?.data?.user) 
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response?.data?.user));
        toast.success("Image updated suceesfully")
        // navigate('/dashboard')

        dispatch(
              updateprofile(
                formData1.firstName,
                formData1.lastName,
                formData1.username,
                formData1.address,
                formData1.phone,
                navigate
              )
            );
        
      
    } catch (error) {
      console.error("Error in update-image request:", error);
    }

    dispatch(setLoading(false));
  };
}



