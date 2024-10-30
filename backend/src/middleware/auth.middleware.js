
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

import { User } from "../models/user.model.js";

//  adding cookie object in at the time of creation
export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    // req ke pass kookie ka access hai
    // why we are using accesstoken
    // accesstoken ke andar jwt token hai
    // Bearer token ke andar jwt token hai
    // Bearer token ke andar jwt token hai ko replace karne ke liye replace("Bearer ","" )
    // replace("Bearer ","" ) is used to remove Bearer from the start of the token
    // req.user = await User.findOne({
    //     // user ko email id se jaise match krna hai
    //     email: req.cookies?.email || req.header("Authorization")?.replace("Bearer ","" ),
    // });
      
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "You are not authorized to access this route.");
    }
    // console.log("schjdsbckjsc ka");
    // console.log("token :", token);/
    

    // await
    const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("dmnfvhjdsjkdbskjvkvkvkvkvkvkvk");
    
    const user =await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    console.log("djkbdjk : ",user);
    
    if (!user) {
      // discuss about frontend
      throw new ApiError(401, "Invalid access token");
    }

    // add new object in user
    req.user = user;
    // console.log("user : ", user);
    
    next();
  } catch (error) {
    // console.log("dvklbdkjvnidnkvlnsdrkvvcew");
    // throw new ApiError(400, "Invalid access token");
    throw new ApiError(400, error?.message || "Invalid access token");
    
    // throw new ApiError(401, );
  }
});
