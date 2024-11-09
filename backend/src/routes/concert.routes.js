import { Router } from "express";
import {
  addConcert,
  registerForConcert,
  allUpcomingConcerts,
  myAttendedConcerts,
  concertDetails
} from "../controllers/concert.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js";
const router = Router();

router.post(
  "/add-concert",
  verifyJwt,
  verifyAdmin,
  upload.single("media"),
  addConcert
);
router.route("/upcoming-concert").get(allUpcomingConcerts);
router.post("/register-for-concert/:Id", verifyJwt, registerForConcert);
router.post("/my-attended-concerts", verifyJwt, myAttendedConcerts);
router.route("/concert/:Id").get(concertDetails);
export default router;
