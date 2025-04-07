// const asyncHandler = require("express-async-handler");

import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../Models/User.model.js";
import { Message } from "../Models/Message.model.js";
import { Chat } from "../Models/Chat.model.js";


const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    // console.log( req.body ) ;
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
        // console.log( message ) ;
      message = await message.populate([
        { path: "sender", select: "name pic" },
        { path: "chat" }
      ]);
  
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.status(200).json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  

export { allMessages, sendMessage };