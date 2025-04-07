import { Router } from "express";
const router = Router();

import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chat.controller.js";

import { verifyJwt } from "../middleware/auth.middleware.js";




router.route("/accesschat").post( verifyJwt, accessChat);
router.route("/fetchchat").get( verifyJwt, fetchChats);
router.route("/group").post(verifyJwt, createGroupChat);
router.route("/rename").put(verifyJwt, renameGroup);
router.route("/groupremove").put(verifyJwt, removeFromGroup);
router.route("/groupadd").put(verifyJwt, addToGroup);

export default router ;