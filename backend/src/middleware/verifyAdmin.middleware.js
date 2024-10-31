import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Middleware to verify if the user is an admin
export const verifyAdmin = asyncHandler((req, res, next) => {
  // Check if the user role is 'admin'
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    throw new ApiError(403, "You do not have permission to access this route.");
  }
});
