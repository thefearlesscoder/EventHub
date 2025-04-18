
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    // console.log("ASFCADZVCXV:",req.body);
    // console.log( "cookie" , req.cookies ) ; 
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "") || req.body.token ;

    if (!token) {
      console.log("dsjcvhjdsch");
      
      return res
    .status(400)
    .json({
        success:false ,
        message: "You are not authorized to access this route."
      }
    );
    }

    // console.log ( "token ->>>" , token )
   
    const decodedToken =  jwt.verify(token, 
          process.env.ACCESS_TOKEN_SECRET);
  
    const user =await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    // console.log("djkbdjk : ",user);
    
    if (!user) {
      // discuss about frontend
      return res
      .status(400)
      .json({
          success:false ,
          message: "Invalid access token"
        }
      );
    }

    req.user = user;
    // console.log("user : ", user);
    
    next();
  } catch (error) {
    // console.log("dvklbdkjvnidnkvlnsdrkvvcew");
   
    return res
      .status(400)
      .json({
          success:false ,
          message: "Invalid access token"
        }
      );
    
  }
});
