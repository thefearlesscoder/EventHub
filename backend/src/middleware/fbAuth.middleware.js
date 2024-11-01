import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
    const idToken = req.headers.authorization;

    if (!idToken) {
        return (
            res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            })
        )
        
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid token"
  
      });
    }
})