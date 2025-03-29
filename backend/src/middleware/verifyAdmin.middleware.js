import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = asyncHandler((req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log("Admin verified");
    next(); 
  } else {
    throw new ApiError(403, "You do not have permission to access this route.");
  }
});
