import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail.js";
import { v2 as cloudinary } from "cloudinary";
import { Friend } from "../Models/Friend.model.js";
import mongoose from "mongoose";
import crypto from "crypto";


const getAllMyFriends = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  console.log("userId: " + userId);

  const friends = await Friend.find({
    $or: [{ sender: userId }, { receiver: userId }],
    status: "accepted",
  }).populate("sender receiver", "-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, { friends }, "Friends fetched successfully"));
});

const requestForFriend = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.params;

  console.log("Friend ID:", friendId);
  console.log("User ID:", userId);

  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid User ID format"));
  }

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!user || !friend) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  console.log("User Name:", user.name);

  if (userId.toString() === friendId.toString()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "You cannot send a friend request to yourself"
        )
      );
  }

  const existingFriendRequest = await Friend.findOne({
    $or: [
      { sender: userId, receiver: friendId, status: "pending" },
      { sender: friendId, receiver: userId, status: "pending" },
    ],
  });

  if (existingFriendRequest) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Friend request already exists"));
  }

  const existingFriend = await Friend.findOne({
    $or: [
      { sender: userId, receiver: friendId, status: "accepted" },
      { sender: friendId, receiver: userId, status: "accepted" },
    ],
  });

  if (existingFriend) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "You are already friends with this user")
      );
  }

  const newFriendRequest = await Friend.create({
    sender: userId,
    receiver: friendId,
    status: "pending",
  });

  console.log("Friend request created:", newFriendRequest);

  const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #f0f0f0; background-color: #f9f9f9; border-radius: 5px;">
        <h2 style="color: #333;">Hello,</h2>
        <p style="font-size: 16px; color: #555;">You have received a friend request from <strong>${user.name}</strong>.</p>
        <p style="color: #333;">You can view or respond to the request in your account.</p>
      </div>
    `;

  await sendEmail({
    email: friend.email,
    subject: "Friend Request",
    htmlContent: emailContent,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { friendRequest: newFriendRequest },
        "Friend request sent successfully"
      )
    );
});

const responseForrequest = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { requestId } = req.params;
  const user = req.user._id;

  console.log("requestId: " + requestId);

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid Request ID format"));
  }

  const request = await Friend.findById(requestId);
  if (!request) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Request not found"));
  }

  if (request.receiver.toString() !== user.toString()) {
    return res
      .status(403)
      .json(
        new ApiResponse(
          403,
          null,
          "You are not authorized to respond to this friend request"
        )
      );
  }

  const existingFriend = await Friend.findOne({
    $or: [
      {
        sender: request.sender,
        receiver: request.receiver,
        status: "accepted",
      },
      {
        sender: request.receiver,
        receiver: request.sender,
        status: "accepted",
      },
    ],
  });

  if (existingFriend) {
    return res.status(400).json(new ApiResponse(400, null, "Already friends"));
  }

  if (status === "accepted") {
    request.status = "accepted";
    await request.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { request },
          "Friend request accepted successfully"
        )
      );
  } else if (status === "rejected") {
    const friend = await Friend.findOneAndDelete({ _id: requestId });

    return res
      .status(200)
      .json(
        new ApiResponse(200, { friend }, "Friend request rejected successfully")
      );
  }

  return res
    .status(400)
    .json(new ApiResponse(400, null, "Invalid status provided"));
});

const usersRequestingMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const friends = await Friend.find({
    receiver: userId,
    status: "pending",
  }).populate("sender receiver", "-password -refreshToken");

  
  const friendsArray = friends.map((friend) => ({
    senderId: friend.sender._id,  
    status: friend.status,
    createdAt: friend.createdAt,
    updatedAt: friend.updatedAt,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, { friends: friendsArray }, "Users requesting you")
    );
});


export { getAllMyFriends, requestForFriend, responseForrequest,usersRequestingMe };
