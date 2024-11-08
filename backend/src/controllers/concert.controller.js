import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { Concert } from "../Models/Concert.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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

  if (
    !artist ||
    !place ||
    !description ||
    !pincode ||
    !date ||
    !ticketPrice ||
    !seatingCapacity
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (new Date(date) <= Date.now()) {
    return res.status(400).json({
      success: false,
      message: "Concert date must be in the future",
    });
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

// corrrently we are not using this 
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
    return res.status(404).json({
      success: false,
      message: "Concert not found",
    });
  }

  const requiredFields = [
    artist,
    place,
    description,
    pincode,
    date,
    ticketPrice,
    seatingCapacity,
  ];

  if (
    requiredFields.some(
      (field) => typeof field === "string" && field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (new Date(date) <= Date.now()) {
    return res.status(404).json({
      success: false,
      message: "Concert date must be in the future",
    });
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

const allUpcomingConcerts = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const upcomingConcerts = await Concert.find({ date: { $gt: currentDate } });

  return res.status(200).json({
    success: true,
    data: upcomingConcerts,
    message: "Upcoming concerts retrieved successfully",
  });
});

const registerForConcert = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  const userId = req.user._id;

  console.log("Concert ID: ", Id);
  console.log("User ID: ", userId);

  const concert = await Concert.findById(Id);
  if (!concert) {
    return res.status(404).json({
      success: false,
      message: "Concert not found",
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (!concert.peoples.includes(userId)) {
    concert.peoples.push(userId);
    await concert.save();
  } else {
    return res.status(400).json({
      success: false,
      message: "You are already registered for this concert",
    });
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

const myAttendedConcerts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  console.log("User ID: ", userId);

  const myAttendedConcerts = await Concert.find({ peoples: userId });
  return res.status(200).json({
    success: true,
    concerts: myAttendedConcerts,
  });
});

const concertDetails = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  const concert = await Concert.findById(Id);

  if (!concert) {
    return res.status(404).json({
      success: false,
      message: "Concert not found",
    });
  }

  return res.status(200).json(
    new ApiResponse(200, concert, "Data of concert fetched successfully")
  );
});


export {
  addConcert,
  registerForConcert,
  allUpcomingConcerts,
  myAttendedConcerts,
  concertDetails
};
