import { Router } from "express";
import {
    addConcert,
    allUpcomingConcerts
}  from "../controllers/concert.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js";
const router = Router();

router.post("/add-concert", verifyJwt,verifyAdmin ,upload.single("media"), addConcert);
router.route("/upcoming-concert").get(verifyJwt, allUpcomingConcerts)
export default router;
