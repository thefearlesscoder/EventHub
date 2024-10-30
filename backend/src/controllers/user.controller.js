import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // console.log("cjhb");

    const user = await User.findById(userId);
    // console.log("hfhjhj : ",user);

    const AccessToken = await user.generateAccessToken();
    // console.log("access token : ", AccessToken);

    const RefreshToken = await user.generateRefreshToken();
    // console.log("refresh token : ", RefreshToken);

    // saving in db
    user.refreshToken = RefreshToken;
    // console.log("sbchjahxbasbk");

    await user.save({ validateBeforeSave: true }); // check why we use -> validateBeforeSave

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong While generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  const { username, email, fullname, password } = req.body;
  console.log("Request body:", req.body);

  // Validate required fields
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user already exists (either by username or email)
  const existingUser = await User.findOne({
    $or: [{ username }, { email }], // Check both username and email
  });

  if (existingUser) {
    throw new ApiError(409, "Username or email already exists");
  }

  // Get avatar and cover image from the uploaded files
  const avatarLocalPath = req.files?.avatar?.[0]?.path; // Safely access avatar path
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // Check if avatar is provided
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // Upload avatar and cover image to Cloudinary
  const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath);

  // If avatar upload fails, throw an error
  if (!avatarUrl) {
    throw new ApiError(500, "Error uploading avatar to Cloudinary");
  }

  // Create user in the database
  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatarUrl.url,
    coverImage: coverImageUrl?.url || "",
  });

  // Fetch the newly created user without password and refresh token
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Error in creating user");
  }

  // Send response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validate user
  // generate jwt token
  // refresh token
  // return jwt token
  //
  const { username, password, email } = req.body;
  // console.log("req body :", req.body);

  if ((!username && !email) || !password) {
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new ApiError(404, "User not Registered");
  }

  const checkPass = await user.isPasswordCorrect(password);
  if (!checkPass) {
    throw new ApiError(401, "Invalid user credentials");
  }
  console.log("before login");

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
    user._id
  ); // because function me db se contact kr rha hai

  // why we again call db for find that user again -> because in 'user' ref me refreshToken nahi hai kyonki vo bad me add huaa hai
  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // for cookies
  const options = {
    httpOnly: true, // only available on server but not modified by frontend only possible by server
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", AccessToken, options)
    .cookie("RefreshToken", RefreshToken, options)
    .json(
      // if user want to save AccessToken and RefreshToken
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          AccessToken,
          RefreshToken,
        },
        "User LoggedIn successfully "
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  // clear cookies
  // console.log("logout called");

  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true, // to get updated
    }
  );

  const options = {
    httpOnly: true, // only available on server but not modified by frontend only possible by server
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.RefreshToken || req.body.RefreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "No refresh token provided unAuthorizedm request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid user unauthorized request");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired");
    }
    const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true, // only available on server but not modified by frontend only possible by server
      secure: true,
    };
    console.log("refresh tokennlkwfklweff");

    return res
      .status(200)
      .cookie("AccessToken", AccessToken, options)
      .cookie("RefreshToken", RefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken: AccessToken },
          "User refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "inValid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, confirmPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Confirm password does not match");
  }
  if (oldPassword === confirmPassword) {
    throw new ApiError(400, "Please provide a new password");
  }
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false }); // not run other validation
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  console.log("Get current user: ", req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data retrieved successfully"));
});

// file update ke liye alag se controller rkhna chahiye

const updatedAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;
  if (!fullname || !email) {
    throw new ApiError(400, "Fullname and email are required");
  }
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    throw new ApiError(400, "thie email already exists");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true }
  ).select("-password"); // new : true -> update ke bad info

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar[0].path;

  // const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  console.log("hjvhjv:", avatarLocalPath);

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  console.log("ammxsx: ", avatar);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "avatar updated successfully"));
});

const updateUsercoverImage = asyncHandler(async (req, res) => {
  const coverImagepath = req.file?.path;
  if (!coverImagepath) {
    throw new ApiError(400, "Avatar is required");
  }

  const coverImage = await uploadOnCloudinary(coverImagepath);
  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading cover image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "avatar updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const username = req.params;
  if (!username?.trim()) {
    throw new ApiError(400, "username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "Subscription",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "Subscription",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);
  if (!channel?.length) {
    throw new ApiError(404, "channel does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully")
    );
});

export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updatedAccountDetails,
  updateUserAvatar,
  updateUsercoverImage,
};
/*

const getUserChannelProfile = asyncHandler(async(req, res) => {
    const {username} = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1

            }
        }
    ])

    if (!channel?.length) {
        throw new ApiError(404, "channel does not exists")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    )
})

*/
