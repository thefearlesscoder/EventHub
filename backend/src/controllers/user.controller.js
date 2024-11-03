import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail.js";

import mongoose from "mongoose";
import crypto from "crypto";
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
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    username,
  } = req.body; // Include username in request body
  console.log("Request body:", req.body);

  // // Validate required fields
  // if ([firstName, lastName, email, password, role, username, password, confirmPassword].some(field => field?.trim() === "")) {
  //   throw new ApiError(400, "All fields are required");
  // }
  // Validate required fields
  // change by kunal
  if (!firstName || !lastName || !email || !password || !role || !username) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
    // return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords should match",
    });
    // throw new ApiError(400, "" ,"Passwords should match");
  }

  // Check if user already exists based on email or username
  const existingUser = await User.findOne({ $or: [{ email }, { username }] }); // Check for username as well
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email or username already exists",
    });
    // throw new ApiError(409, "","Email or username already exists");
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
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    return res.status(500).json({
      success: false,
      message: "Error in creating user",
    });
    // throw new ApiError(500, "Error in creating user");
  }

  // Return a success response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  // console.log("req body :", req.body);

  if (!email && !password) {
    return res.status(500).json({
      success: false,
      message: "all fields are required",
    });
  }

  const user = await User.findOne({ $or: [{ email }] });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found",
    });
  }

  const checkPass = await user.isPasswordCorrect(password);
  if (!checkPass) {
    return res.status(401).json({
      success: false,
      message: "Invalid user credentials",
    });
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
      return res.status(401).json({
        success: false,
        message: "Invalid user unauthorized request",
      });
      
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "refresh token is expired",
      });
      
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
    return res.status(401).json({
      success: false,
      message: "inValid refresh token",
    });
  }
});

const generateResetEmail = (resetUrl) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4caf50;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .content {
          padding: 20px;
          color: #333;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #4caf50;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click the button below, or paste the following link into your browser to complete the process:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
        <div class="footer">
          <p>Thank you for using our service!</p>
        </div>
      </div>
    </body>
  </html>
`;

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "This email is not registered",
    });
    
  }
  console.log("User found");

  // Create a reset token and set its expiration
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  // user.resetPasswordExpires = Date.now() + ; // 5 minutes
  user.resetPasswordExpires = Date.now() + 60 * 1000 * 5;
  console.log("User reset token created");

  await user.save();

  // Create a password reset link
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset-password/${resetToken}`;

 

  await sendEmail({
    email: user.email,
    subject: "password reset",
    htmlContent: generateResetEmail(resetUrl),
  });

  // await transporter.sendMail(mailOptions);

  res.status(200).json({ message: "Password reset link sent to email" });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const token = req.params.token;
  console.log("Token received:", token);
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }, // This is a MongoDB comparison operator meaning "greater than". // Ensures token is not expired
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    })
   
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  // Update the user's password and clear the reset token and expiration
  user.password = password; // Here, you should ideally hash the password again
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Password reset successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  console.log("Get current user: ", req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data retrieved successfully"));
});

// file update ke liye alag se controller rkhna chahiye

const updatedAccountDetails = asyncHandler( async (req, res) => {
  const { firstName, lastName, username, phone, address } = req.body;

  // Check for at least one field to update
  if ( !firstName && !lastName && !username && !phone && !address ) {
    return res
    .status(400)
    .json({
        success:false ,
        message: "Provide at least one field to update"
      }
    );
  }

  // Check if user exists
  const existUser = await User.findById(req.user?._id);
  if (!existUser) {
    return res
    .status(400)
    .json({
        success:false ,
        message: "User does not exist"
      }
    );
    // throw new ApiError(400, "User does not exist");
  }

  // Prepare update object
  const updateData = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (username) updateData.username = username;
  if (phone) updateData.phone = phone;
  if (address) updateData.address = address ;
  

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

const changeImage = asyncHandler(async (req, res) => {
  
  console.log("Inside changeImage handler");

  const admin = req.user;
  console.log("Admin:", admin);

  let imagePath;
  if (
    req.files &&
    Array.isArray(req.files.image) &&
    req.files.image.length > 0
  ) {
    imagePath = req.files.image[0].path;
  }
  console.log("Image Path:", imagePath);

  if (!imagePath) {
    throw new ApiError(400, "Image not found");
  }

  // Upload new image to Cloudinary
  const imageUrl = await uploadOnCloudinary(imagePath);

  // Find the existing admin to retrieve the old image URL
  const existingAdmin = await User.findById(admin._id);
  if (!existingAdmin) {
    throw new ApiError(404, "Admin not found");
  }

  const oldImage = existingAdmin.image;
  console.log("old image ", oldImage);

  // Update the admin's image URL
  console.log("id: ", admin._id.toString());
  console.log("sjcvjhds:",imageUrl);
  
  const updatedAdmin = await User.findByIdAndUpdate(
    admin._id.toString(), // Convert ObjectId to string
    { image: imageUrl.secure_url },
    { new: true }
  );

  console.log("Updated Admin:", updatedAdmin);

  // Remove the old image from Cloudinary if it exists
  // if (oldImage) {
  //   await deleteFromCloudinary(oldImage);
  // }
  return res
  .status(200)
  .json(
    new ApiResponse(200, updatedAdmin, "Admin details updated successfully")
  );
  

  // console.error("Error in changeImage:", error);
  // throw new ApiError(500, "Failed to change image");

});

const updateUserAvatar = asyncHandler(async (req, res) => {
  // Ensure avatar file is provided
  console.log(hello) ;
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

const changePassword = asyncHandler(async (req, res) => {
  // imp step
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    throw new ApiError(400, "All fields are required");
  }

  // const isMatch = await user.isPasswordCorrect(password);

  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, "Invalid old password");
  }

  if (newPassword != confirmNewPassword) {
    throw new ApiError(400, "New password and confirm password do not match");
  }
  const isSame = await user.isPasswordCorrect(newPassword);
  if (isSame) {
    throw new ApiError(400, "New password cannot be same as old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: true });
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Password changed successfully"));
});

const fbSignIn = asyncHandler(async (req, res) => {
  const { uid, name, email, picture } = req.user;

  let user = await User.findOne({ uid });
  // yahan model ki vajah se error aa sakta hai
  // agr error aya to iska alg model banega

  if (!user) {
    user = new User({ uid, name, email, picture });
    await user.save();
  }

  res.send(user);
});

export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  resetPassword,
  getCurrentUser,
  updatedAccountDetails,
  updateUserAvatar,
  forgotPassword,
  changePassword,
  fbSignIn,
  changeImage
};
