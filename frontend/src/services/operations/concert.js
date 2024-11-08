
import { useNavigate } from "react-router-dom";
import { apiconnector } from "../apiconnector";
import { concertApi } from "../apis";
import { toast } from "react-hot-toast";

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
    token
  ) {

    return async (dispatch) => {
      try {

        // console.log({
        //   artist,
        //   description,
        //   date,
        //   pincode,
        //   ticketPrice,
        //   seatingCapacity,
        //   genre,
        //   place
        // });
        
        const response = await apiconnector("POST", ADDCONCERT_API , {
            artist ,
            description  ,
            pincode ,
            date ,
            ticketPrice ,
            seatingCapacity  ,
            genre , 
            place ,
            token 
            
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