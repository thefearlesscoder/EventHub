
import { useNavigate } from "react-router-dom";
import { apiconnector } from "../apiconnector";
import { concertApi } from "../apis";
import { toast } from "react-hot-toast";
import axios from "axios";

const { ADDCONCERT_API } = concertApi  ;

export function createConcert (formData, navigate) {
    return async (dispatch) => {
      try {
        // console.log("Submitting formData:", formData);
        
        let response = await axios.post( ADDCONCERT_API, formData, { 
          withCredentials : true
        } ) ;
  
        // console.log("UPLOAD CONCERT API RESPONSE............", response)
        response = response?.data 
        if (!response?.success) {
            toast.error(response?.message)
          throw new Error(response?.message)
        }else {
            toast.success("Event Created Successfully")
            // navigate('/')
        }
      } catch (error) {
        // console.log("UPLOAD CONCERT API ERROR............", error)
        // navigate
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        // console.log("UPLOAD CONCERT API ERROR MESSAGE:", errorMessage);
      }
    }
  }