import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

import { Concert } from "../Models/Concert.model.js";

const addConcert = asyncHandler(async (req, res) => {
  const {
    artist,
    place,
    description,
    pincode,
    date,
    ticketPrice,
    seatingCapacity,
    genre,
    media,
  } = req.body;

  console.log("Request body:", req.body);

  const requiredFields = [artist, place, description, pincode, date, ticketPrice, seatingCapacity];

  if (requiredFields.some(field => typeof field === 'string' && field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (new Date(date) <= Date.now()) {
    throw new ApiError(400, "Concert date must be in the future");
  }

  const adminId = req.user._id;

  const concert = await Concert.create({
    artist,
    place,
    description,
    pincode,
    date,
    addedBy: adminId,
    ticketPrice,
    seatingCapacity,
    genre,
    media,
  });

  await User.findByIdAndUpdate(
    adminId, 
    { $push: { myAddedConcerts: concert._id } }, 
    { new: true }
  );

  return res.status(201).json({
    success: true,
    message: "Concert added successfully",
    concert: concert,
  });
});

const updateConcert = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  const {
    artist,
    place,
    description,
    pincode,
    date,
    ticketPrice,
    seatingCapacity,
    genre,
    media,
  } = req.body;

  const concert = await Concert.findById(Id);
  if (!concert) {
    throw new ApiError(404, "Concert not found");
  }

  const requiredFields = [artist, place, description, pincode, date, ticketPrice, seatingCapacity];

  if (requiredFields.some(field => typeof field === 'string' && field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (new Date(date) <= Date.now()) {
    throw new ApiError(400, "Concert date must be in the future");
  }

  concert.artist = artist;
  concert.place = place;
  concert.description = description;
  concert.pincode = pincode;
  concert.date = date;
  concert.ticketPrice = ticketPrice;
  concert.seatingCapacity = seatingCapacity;
  concert.genre = genre;
  concert.media = media;

  await concert.save();

  return res.status(200).json({
    success: true,
    message: "Concert updated successfully",
    concert: concert,
  });
});


const registerForConcert = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  const userId = req.user._id; 

  const concert = await Concert.findById(Id);
  if (!concert) {
    throw new ApiError(404, "Concert not found");
  }

  if (!concert.peoples.includes(userId)) {
    concert.peoples.push(userId);
    await concert.save(); 
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.upcoming_attendconcert.includes(Id)) {
    user.upcoming_attendconcert.push(Id);
    await user.save(); 
  }

  return res.status(200).json({
    success: true,
    message: "Successfully registered for the concert",
    concertId: Id,
  });
});


export  {addConcert, registerForConcert, updateConcert};
