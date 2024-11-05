
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

import { User } from "../Models/User.model.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "") || req.token ;

    if (!token) {
      return res
    .status(400)
    .json({
        success:false ,
        message: "You are not authorized to access this route."
      }
    );
      // throw new ApiError(401, "You are not authorized to access this route.");
    }
   
    const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user =await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    console.log("djkbdjk : ",user);
    
    if (!user) {
<<<<<<< HEAD
      throw new ApiError(401, "Invalid access token");
=======
      // discuss about frontend
      return res
      .status(400)
      .json({
          success:false ,
          message: "Invalid access token"
        }
      );
      // throw new ApiError(401, "Invalid access token");
>>>>>>> 84f8a5c5aaefc3cbd712145ba1994bd1ca61b1de
    }

    req.user = user;
    // console.log("user : ", user);
    
    next();
  } catch (error) {
    // console.log("dvklbdkjvnidnkvlnsdrkvvcew");
<<<<<<< HEAD
    throw new ApiError(400, error?.message || "Invalid access token");
=======
    // throw new ApiError(400, "Invalid access token");
    return res
      .status(400)
      .json({
          success:false ,
          message: "Invalid access token"
        }
      );
    // throw new ApiError(400, error?.message || "Invalid access token");
>>>>>>> 84f8a5c5aaefc3cbd712145ba1994bd1ca61b1de
    
  }
});
