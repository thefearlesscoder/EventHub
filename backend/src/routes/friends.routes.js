import { Router } from "express";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyToken } from "../middleware/fbAuth.middleware.js";
import {
  requestForFriend,
  getAllMyFriends,
  responseForrequest,
  usersRequestingMe,
} from "../controllers/friends.controller.js";

router.route("/request-friend/:friendId").post(verifyJwt, requestForFriend);
router.route("/my-friends").post(verifyJwt, getAllMyFriends);
router
  .route("/response-request/:requestId")
  .post(verifyJwt, responseForrequest);
  

router.route("/users-requesting-me").post(verifyJwt, usersRequestingMe);
export default router;
