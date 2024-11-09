import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  getCurrentUser,
  updatedAccountDetails,
  forgotPassword,
  changePassword,
  resetPassword,
  fbSignIn,
  changeImage,
  contactUs,
  
  // updateUsercoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyToken } from "../middleware/fbAuth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
// router.route("/change-password").post(verifyJwt, changeCurrentPassword);
// router.route("/getCurrentUser").get(verifyJwt, getCurrentUser);
router.route("/update-details").post(verifyJwt, updatedAccountDetails);
router.route("/update-image").post(verifyJwt, changeImage);

router.route("/change-password").post(verifyJwt, changePassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/googlesignin").post(verifyToken, fbSignIn);
router.route("/contact-us").post(verifyJwt, contactUs)

export default router;
