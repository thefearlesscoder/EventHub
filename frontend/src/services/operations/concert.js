
import { useNavigate } from "react-router-dom";
import { apiconnector } from "../apiconnector";
import { concertApi } from "../apis";
import { toast } from "react-hot-toast";
import axios from "axios";

const { ADDCONCERT_API } = concertApi  ;

export function createConcert (
    artist ,
    description  ,
    date ,
    pincode ,
    ticketPrice ,
    seatingCapacity  ,
    genre , 
    place , 
    navigate 
  ) {

    return async (dispatch) => {
      try {

        console.log({
          artist,
          description,
          date,
          pincode,
          ticketPrice,
          seatingCapacity,
          genre,
          place
        });

        
        
        let response = await axios.post( ADDCONCERT_API , {
            artist ,
            description  ,
            pincode ,
            date ,
            ticketPrice ,
            seatingCapacity  ,
            genre , 
            place ,
            
        }, { withCredentials : true  } ) ;
  
        console.log("UPLOAD CONCERT API RESPONSE............", response)
        response = response?.data 
        if (!response?.success) {
            toast.error(response?.message)
          throw new Error(response?.message)
        }else {
            toast.success(response?.message)
            navigate('/dashboard')
        }
      } catch (error) {
        console.log("UPLOAD CONCERT API ERROR............", error?.data?.message)
        // navigate
        toast.error(error?.data?.message)
      }
    }
  }