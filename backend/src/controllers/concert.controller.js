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

// const registerForConcert = asy

export  {addConcert};
