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

<<<<<<< HEAD
router.post("/add-concert", verifyJwt,verifyAdmin ,upload.single("media"), addConcert);
router.route("/upcoming-concert").get(allUpcomingConcerts)
=======
router.post(
  "/add-concert",
  verifyJwt,
  verifyAdmin,
  upload.single("media"),
  addConcert
);
router.route("/upcoming-concert").get(allUpcomingConcerts);
router.post("/register-for-concert/:Id", verifyJwt, registerForConcert);
router.get("/my-attended-concerts", verifyJwt, myAttendedConcerts);
router.route("/concert/:Id").get(concertDetails);
>>>>>>> 333c01d19be82b2c8fecaf64c8bda7f46661f58e
export default router;
