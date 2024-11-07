
import { useNavigate } from "react-router-dom";
import { apiconnector } from "../apiconnector";
import { concertApi } from "../apis";
import { toast } from "react-hot-toast";

const { ADDCONCERT_API } = concertApi  ;

export function createConcert (
    artist ,
    description  ,
    pincode ,
    date ,
    ticketPrice ,
    seatingCapacity  ,
    genre , 
    place , 
  ) {

    return async (dispatch) => {
      try {
        const response = await apiconnector("POST", ADDCONCERT_API , {
            artist ,
            description  ,
            pincode ,
            date ,
            ticketPrice ,
            seatingCapacity  ,
            genre , 
            place 
        })
  
        console.log("UPLOAD CONCERT API RESPONSE............", response)
  
        if (!response?.success) {
            toast.error(response?.message)
          throw new Error(response?.message)
        }else {
            toast.success(response?.message)
        }
      } catch (error) {
        console.log("UPLOAD CONCERT API ERROR............", error)
      }
    }
  }