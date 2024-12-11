
import { apiconnector } from "../apiconnector";
import { updateApi } from "../apis";
import { setLoading, setUser, setToken } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

const { UPDATEPROFILE_API, UPDATE_IMAGE } = updateApi;

export function updateprofile(
  firstName,
  lastName,
  username,
  address,
  phone,
  navigate, token
) {
  //   const navigate = useNavigate() ;
  return async (dispatch) => {
    // console.log("kunal here")
    // const { token } = useSelector( (state) => state.auth.token ) ;
    console.log("token -> ", token);

    dispatch(setLoading(true))
    try {

      const response = await apiconnector("POST", UPDATEPROFILE_API, {
        firstName,
        lastName,
        username,
        address,
        phone,
        token
      })

      console.log("UPDATEPROFILE API RESPONSE............", response)

      if (!response?.success) {
        toast.error(response?.message)
        throw new Error(response?.message)
      } else {
        toast.success(response?.message)
        setUser(response?.data);
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response?.data))
        // navigate("/ab")
        navigate('/dashboard')
      }
    } catch (error) {
      console.log("profile API ERROR............", error)
      navigate("/update-profile")
    }
    dispatch(setLoading(false))

  }
}


export function updateImage(formData, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      console.log("bmncbskd");
      console.log("FormData content:", [...formData.entries()]);

      const response = await axios.post("http://localhost:5000/api/v1/users/update-image", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("UPDATEIMAGE API RESPONSE:", response.data.user);
        setToken(response?.data?.user?.AccessToken);
        setUser(response?.data?.user) 
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response?.data?.user));
        toast.success("Image updated suceesfully")
        // navigate('/dashboard')
    } catch (error) {
      console.error("Error in update-image request:", error);
    }

    dispatch(setLoading(false));
  };
}



