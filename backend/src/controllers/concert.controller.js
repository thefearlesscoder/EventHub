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

  // Validate required fields, ensuring they are strings before trimming
  const requiredFields = [artist, place, description, pincode, date, ticketPrice, seatingCapacity];

  if (requiredFields.some(field => typeof field === 'string' && field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure the date is in the future
  if (new Date(date) <= Date.now()) {
    throw new ApiError(400, "Concert date must be in the future");
  }

  // Use the admin ID from req.user
  const adminId = req.user._id;

  // Create the new concert
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

  // Update the admin's myAddedConcerts field
  await User.findByIdAndUpdate(
    adminId, // admin's ID from the request user
    { $push: { myAddedConcerts: concert._id } }, // add the concert ID to myAddedConcerts
    { new: true }
  );

  // Return a success response with the created concert
  return res.status(201).json({
    success: true,
    message: "Concert added successfully",
    concert: concert,
  });
});

const updateConcert = asyncHandler(async (req, res) => {
  const { Id } = req.params; // Concert ID from the request parameters
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

  // Find the concert by ID
  const concert = await Concert.findById(Id);
  if (!concert) {
    throw new ApiError(404, "Concert not found");
  }

  // Validate required fields, ensuring they are strings before trimming
  const requiredFields = [artist, place, description, pincode, date, ticketPrice, seatingCapacity];

  if (requiredFields.some(field => typeof field === 'string' && field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure the date is in the future
  if (new Date(date) <= Date.now()) {
    throw new ApiError(400, "Concert date must be in the future");
  }

  // Update concert details
  concert.artist = artist;
  concert.place = place;
  concert.description = description;
  concert.pincode = pincode;
  concert.date = date;
  concert.ticketPrice = ticketPrice;
  concert.seatingCapacity = seatingCapacity;
  concert.genre = genre;
  concert.media = media;

  // Save the updated concert
  await concert.save();

  // Return a success response with the updated concert
  return res.status(200).json({
    success: true,
    message: "Concert updated successfully",
    concert: concert,
  });
});


const registerForConcert = asyncHandler(async (req, res) => {
  const { Id } = req.params; // Concert ID from the request parameters
  const userId = req.user._id; // User ID from the request object

  // Step 1: Find the concert by ID
  const concert = await Concert.findById(Id);
  if (!concert) {
    throw new ApiError(404, "Concert not found");
  }

  // Step 2: Update the concert's peoples array
  if (!concert.peoples.includes(userId)) {
    concert.peoples.push(userId);
    await concert.save(); // Save the updated concert
  }

  // Step 3: Update the user's upcoming_attendconcert field
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.upcoming_attendconcert.includes(Id)) {
    user.upcoming_attendconcert.push(Id);
    await user.save(); // Save the updated user
  }

  // Step 4: Return a success response
  return res.status(200).json({
    success: true,
    message: "Successfully registered for the concert",
    concertId: Id,
  });
});


export  {addConcert, registerForConcert, updateConcert};
