import admin from "firebase-admin";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  console.log("Authorization Header:", authorizationHeader); 


  const idToken =
    authorizationHeader && authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.split(" ")[1]
      : authorizationHeader;

  console.log("middle");
  console.log(idToken);

  if (!idToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log("user token gys: ", decodedToken);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
});
