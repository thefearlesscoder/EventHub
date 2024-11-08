import { Router } from "express";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyToken } from "../middleware/fbAuth.middleware.js";
import { requestForFriend, getAllMyFriends, responseForrequest } from "../controllers/friends.controller.js";



router.route("/request-friend/:friendId").post(verifyJwt, requestForFriend);
router.route("/my-friends").get(verifyJwt, getAllMyFriends);
router.route("/response-request/:requestId").post(verifyJwt, responseForrequest);
export default router