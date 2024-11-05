import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  getCurrentUser,
  updatedAccountDetails,
  updateUserAvatar,
  forgotPassword,
  changePassword,
  resetPassword,
  fbSignIn,
  changeImage
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
// router.route("/update-image").post(
//   verifyJwt,
//   upload.fields([
//     {
//       name: "image",
//       maxCount: 1,
//     },
//   ]),
//   changeImage
// );
// router
//   .route("/update-avatar")
//   .post(
//     verifyJwt,
//     upload.fields([{ name: "avatar", maxCount: 1 }]), // Fix here
//     updateUserAvatar
//   );
router.route("/change-password").post(verifyJwt, changePassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/googlesignin").post(verifyToken, fbSignIn);

export default router;
