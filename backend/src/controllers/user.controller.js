import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const AccessToken = await user.generateAccessToken();
    console.log("access token : ", AccessToken);

    const RefreshToken = await user.generateRefreshToken();
    user.refreshToken = RefreshToken;

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
  const { firstName, lastName, email, password, confirmPassword, role, username } = req.body; // Include username in request body
  console.log("Request body:", req.body);

  // Check if passwords match
  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords should match");
  }

  // Validate required fields
  if ([firstName, lastName, email, password, role, username].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists based on email or username
  const existingUser = await User.findOne({ $or: [{ email }, { username }] }); // Check for username as well
  if (existingUser) {
    throw new ApiError(409, "Email or username already exists");
  }

  // Hash the password before saving it
  // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  // Create the new user
  const user = await User.create({
    uid: uuidv4(), // Generate a unique UID
    role,
    firstName,
    lastName,
    email,
    username, // Ensure the username is included
    password, // Store hashed password
  });

  // Retrieve the created user without sensitive information
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Error in creating user");
  }

  // Return a success response
  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  // console.log("req body :", req.body);

  if (!email && !password) {
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.findOne({ $or: [{ email }] });
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
  );
  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("AccessToken", AccessToken, options)
    .cookie("RefreshToken", RefreshToken, options)
    .json(
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
  const { firstName, lastName, username, phone, address } = req.body;

  // Check for at least one field to update
  if (!firstName && !lastName && !username && !phone && !address) {
    throw new ApiError(400, "Provide at least one field to update");
  }

  // Check if user exists
  const existUser = await User.findById(req.user?._id);
  if (!existUser) {
    throw new ApiError(400, "User does not exist");
  }

  // Prepare update object
  const updateData = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (username) updateData.username = username;
  if (phone) updateData.phone = phone;
  if (address) {
    updateData.address = {
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    };
  }

  // Update user details
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updateData },
    { new: true }
  ).select("-password"); // Exclude password from response

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});



const updateUserAvatar = asyncHandler(async (req, res) => {
  // Ensure avatar file is provided
  const avatarFile = req.files?.avatar?.[0];
  if (!avatarFile) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const avatarLocalPath = avatarFile.path;
  console.log("Local avatar path:", avatarLocalPath);

  // Upload avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log("Uploading avatar :", avatar);
  
  if (!avatar || !avatar.url) {
    throw new ApiError(500, "Error occurred while uploading avatar.");
  }
  console.log("Uploaded avatar URL:", avatar.url);

  // Update user avatar URL in database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { image: avatar.url } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
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

};
