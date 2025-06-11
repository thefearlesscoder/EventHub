import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { Concert } from "../Models/Concert.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Friend } from "../Models/Friend.model.js";
const addConcert = asyncHandler(async (req, res) => {
  // log("well here sdmbdkj")
  const userId = req.user._id;

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
  } = req.body?.artist;

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
    adminId: userId,
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

const getRegisteredPeople = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const concert = await Concert.findById(id).populate("peoples");
  if (!concert) {
    throw new Error("Concert not found");
  }

  const allFriendRelations = await Friend.find({
    $or: [
      { sender: userId },
      { receiver: userId }
    ]
  });

  const friends = new Set();
  const pending = new Set();

  for (let rel of allFriendRelations) {
    const otherUser =
      rel.sender.toString() === userId.toString()
        ? rel.receiver.toString()
        : rel.sender.toString();

    if (rel.status === "accepted") {
      friends.add(otherUser);
    } else if (rel.status === "pending") {
      pending.add(otherUser);
    }
  }

  const myFriendList = [];
  const requestFriendList = [];
  const nonFriendList = [];

  for (let person of concert.peoples) {
    const personId = person._id.toString();

    if (personId === userId.toString()) continue; 

    if (friends.has(personId)) {
      myFriendList.push(person);
    } else if (pending.has(personId)) {
      requestFriendList.push(person);
    } else {
      nonFriendList.push(person);
    }
  }

  return res.status(200).json(
    new ApiResponse(200, {
      myFriendList,
      requestFriendList,
      nonFriendList
    }, "Categorized registered people")
  );
});


const allUpcomingConcerts = asyncHandler(async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingConcerts = await Concert.find({ date: { $gt: currentDate } });
    console.log("all upcoming here");

    const concertArray = upcomingConcerts
      .map(
        ({
          _id,
          artist,
          place,
          description,
          pincode,
          date,
          peoples,
          addedBy,
          ticketPrice,
          seatingCapacity,
          genre,
          media,
        }) => ({
          id: _id,
          artist,
          place,
          description,
          pincode,
          date,
          peoples: peoples.length,
          addedBy,
          ticketPrice,
          seatingCapacity,
          genre,
          media: {
            images: media.images,
            videos: media.videos,
          },
        })
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return res.status(200).json({
      success: true,
      data: concertArray,
      message: "Upcoming concerts retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving upcoming concerts",
    });
  }
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

  // console.log(user);

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

const concertDetails = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  const concert = await Concert.findById(Id).populate("addedBy").populate("peoples");

  if (!concert) {
    return res.status(404).json({
      success: false,
      message: "Concert not found",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, concert, "Data of concert fetched successfully")
    );
});

const myUpcomingConcerts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate({
    path: "upcoming_attendconcert",
    match: { date: { $gt: Date.now() } },
    select: "artist place date ticketPrice genre",
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        true,
        user.upcoming_attendconcert,
        "User's upcoming concerts retrieved successfully"
      )
    );
});

const myAttendedConcerts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // console.log("User ID: ", userId);

  const user = await User.findById(userId).populate({
    path: "upcoming_attendconcert",
    match: { date: { $lt: Date.now() } },
    select: "artist place date ticketPrice genre",
  });
  // console.log("xbvkjcj: ", user);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const attendedConcerts = user.upcoming_attendconcert
    .map((concert) => ({
      artist: concert.artist,
      place: concert.place,
      date: concert.date,
      ticketPrice: concert.ticketPrice,
      genre: concert.genre,
    }))
    .sort((a, b) => b.date - a.date);

  return res.status(200).json({
    success: true,
    data: attendedConcerts,
    message: "User's attended concerts retrieved successfully",
  });
});

const filterConcerts = asyncHandler(async (req, res) => {
  try {
    const { category } = req.body;
    const currentDate = new Date();
    let filter = { date: { $gt: currentDate } };

    if (category && category !== "all") {
      filter.genre = category;
    }

    const filteredConcerts = await Concert.find(filter);

    const concertArray = filteredConcerts
      .map(
        ({
          _id,
          artist,
          place,
          description,
          pincode,
          date,
          peoples,
          addedBy,
          ticketPrice,
          seatingCapacity,
          genre,
          media,
        }) => ({
          id: _id,
          artist,
          place,
          description,
          pincode,
          date,
          peoples: peoples.length,
          addedBy,
          ticketPrice,
          seatingCapacity,
          genre,
          media: {
            images: media.images,
            videos: media.videos,
          },
        })
      )
      .sort((a, b) => a.date - b.date);

    return res.status(200).json({
      success: true,
      data: concertArray,
      message: "Filtered concerts retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving filtered concerts",
    });
  }
});

const getMyAddedConcerts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const list = await Concert.find({ adminId: userId })
    .populate({ path: "artist", select: "name" })
    .populate({ path: "place", select: "name location" })
    .populate({ path: "genre", select: "name" });

  return res.status(200).json({
    success: true,
    data: list,
    message: "My added concerts retrieved successfully",
  });
});

const getMyAllRegisteredConcerts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate({
    path: "upcoming_attendconcert",
    select: "artist place date ticketPrice genre",
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  
  const attendedConcerts = user.upcoming_attendconcert
    .map((concert) => ({
      artist: concert.artist,
      place: concert.place,
      date: new Date(concert.date), 
      ticketPrice: concert.ticketPrice,
      genre: concert.genre,
    }))
    .sort((a, b) => b.date - a.date);

  return res.status(200).json({
    success: true,
    data: attendedConcerts,
    message: "User's attended concerts retrieved successfully",
  });
});

export {
  addConcert,
  registerForConcert,
  allUpcomingConcerts,
  myAttendedConcerts,
  concertDetails,
  myUpcomingConcerts,
  filterConcerts,
  getRegisteredPeople,
  getMyAddedConcerts,
  getMyAllRegisteredConcerts,
};
