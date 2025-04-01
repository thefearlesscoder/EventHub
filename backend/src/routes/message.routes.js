import { Router } from "express";
const router = Router();


import { verifyJwt } from "../middleware/auth.middleware.js";
import { allMessages, sendMessage } from "../controllers/message.controller.js";

router.route("/:chatId").get( verifyJwt , allMessages);
router.route("/sendmessage").post( verifyJwt , sendMessage);

export default router ;