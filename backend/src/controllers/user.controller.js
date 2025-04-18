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

const options = {
  httpOnly: false, // JS can access (not recommended for auth cookies)
  secure: false, // true if you're on HTTPS
  sameSite: "Lax", // use "None" only if needed and with secure: true
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const AccessToken = await user.generateAccessToken();
    console.log("access token : ", AccessToken);

    const RefreshToken = await user.generateRefreshToken();
    user.refreshToken = RefreshToken;

    await user.save({ validateBeforeSave: true });

    return { AccessToken, RefreshToken };
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating access and refresh token",
    });
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
  } = req.body;
  console.log("Request body:", req.body);

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }
  if (!firstName || !lastName || !email || !password || !role || !username) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords should match",
    });
  }

  const existingUser = await User.findOne({ $or: [{ email }] });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  const user = await User.create({
    uid: uuidv4(),
    role,
    firstName,
    lastName,
    email,
    username,
    password,
  });

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
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
// const sendPasswordtoEmail = (password) => `
//   <!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Password Reset</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f4f4f4;
//           margin: 0;
//           padding: 20px;
//         }
//         .container {
//           max-width: 600px;
//           margin: 0 auto;
//           background-color: #ffffff;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         .header {
//           background-color: #4caf50;
//           color: #ffffff;
//           text-align: center;
//           padding: 20px;
//         }
//         .content {
//           padding: 20px;
//           color: #333;
//         }
//         .button {
//           display: inline-block;
//           margin-top: 20px;
//           padding: 10px 20px;
//           background-color: #4caf50;
//           color: #ffffff;
//           text-decoration: none;
//           border-radius: 5px;
//         }
//         .footer {
//           text-align: center;
//           padding: 10px;
//           font-size: 12px;
//           color: #999;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Password Created</h1>
//         </div>
//         <div class="content">
//           <p>You are receiving this because you (or someone else) have requested to create a new account.</p>
//           <h2>Your new Password is ${password}</h2>
//           <p>Please use this password to log in to your account and change it as soon as possible.</p>
//         </div>
//         <div class="footer">
//           <p>Thank you for using our service!</p>
//         </div>
//       </div>
//     </body>
//   </html>
// `;

// const registerUserviaGoogle = asyncHandler(async (req, res) => {
//   const { email,  given_name, family_name } = req.body;
//   console.log("Request body:", req.body);
//   if (!email) {
//     return res.status(400).json({
//       success: false,
//       message: "Email is required",
//     });
//   }

//   const existingUser = await User.findOne({ $or: [{ email }] });
//   if (existingUser) {
//     // console.log("before login");

//     const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
//       existingUser._id
//     );
//     const loggedinUser = await User.findById(existingUser._id).select(
//       "-password -refreshToken"
//     );

//     return res
//       .status(200)
//       .cookie("AccessToken", AccessToken, options)
//       .cookie("RefreshToken", RefreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           {
//             user: loggedinUser,
//             AccessToken,
//             RefreshToken,
//           },
//           "User LoggedIn successfully "
//         )
//       );
//   }

//   const user = await User.create({
//     uid: uuidv4(),
//     role: "user",
//     firstName: given_name,
//     lastName: family_name,
//     email: email,
//     username: email.split("@")[0],
//     password: email.split("@")[0],
//   });
//   const password = email.split("@")[0];
//   await sendEmail({
//     email: user.email,
//     subject: "password created",
//     htmlContent: sendPasswordtoEmail(password),
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   // console.log("before login");

//   const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
//     user._id
//   );
//   const loggedinUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   return res
//     .status(200)
//     .cookie("AccessToken", AccessToken, options)
//     .cookie("RefreshToken", RefreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedinUser,
//           AccessToken,
//           RefreshToken,
//         },
//         "User LoggedIn successfully "
//       )
//     );
// });

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

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
  const loggedinUser = await User.findById(user._id)
  .select("-password -refreshToken")
  .populate("friends", "-password -refreshToken"); // Exclude these fields from populated friends


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

const generateSecurePassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

const sendPasswordtoEmail = (password, username) => `
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
          <h1>Password Created</h1>
        </div>
        <div class="content">
          <p>You are receiving this because you (or someone else) have requested to create a new account.</p>
          <h2>Your new Password is ${password} ans username : ${username}</h2>
          <p>Please use this password to log in to your account and change it as soon as possible.</p>
        </div>
        <div class="footer">
          <p>Thank you for using our service!</p>
        </div>
      </div>
    </body>
  </html>
;`;

const registerUserviaGoogle = asyncHandler(async (req, res) => {
  const { email, given_name, family_name } = req.body;
  // console.log("Request body:", req.body);

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
      existingUser._id
    );
    const loggedinUser = await User.findById(existingUser._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("AccessToken", AccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .cookie("RefreshToken", RefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json(
        new ApiResponse(
          200,
          { user: loggedinUser, AccessToken, RefreshToken },
          "User LoggedIn successfully"
        )
      );
  }

  const password = generateSecurePassword();

  const username = email.split("@")[0];

  const user = await User.create({
    uid: uuidv4(),
    role: "user",
    firstName: given_name,
    lastName: family_name,
    email: email,
    username: username,
    password: password,
  });
  console.log("sjvjdsdsd :", user);

  await sendEmail({
    email: user.email,
    subject: "password set",
    htmlContent: sendPasswordtoEmail(password, username),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("AccessToken", AccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    })
    .cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    })
    .json(
      new ApiResponse(
        200,
        { user: createdUser, AccessToken, RefreshToken },
        "User Registered Successfully"
      )
    );
});

// const googleLogin = asyncHandler(async (req, res) => {
//   const { email, firstName, lastName, role, username } = req.body;

//   if (!email) {
//     return res.status(500).json({
//       success: false,
//       message: "EMAIL not found Login Failed",
//     });
//   }

//   const user = await User.findOne({ $or: [{ email }] });
//   if (!user) {
//      // create the user
//      const user = await User.create({
//       uid: uuidv4(),
//       role,
//       firstName,
//       lastName,
//       email,
//       username,
//     });

//     const createdUser = await User.findById(user._id).select(
//       "-refreshToken"
//     );
//   }

//   console.log("before login");

//   const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
//     user._id
//   );
//   const loggedinUser = await User.findById(user._id).select(
//     "-refreshToken"
//   );

//   return res
//     .status(200)
//     .cookie("AccessToken", AccessToken, options)
//     .cookie("RefreshToken", RefreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedinUser,
//           AccessToken,
//           RefreshToken,
//         },
//         "User LoggedIn successfully "
//       )
//     );
// });

const logOutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
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
    return res.status(401).json({
      success: false,
      message: "No refresh token provided unauthorized request",
    });
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
      httpOnly: true,
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

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 60 * 1000 * 5;
  console.log("User reset token created");

  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: "password reset",
    htmlContent: generateResetEmail(resetUrl),
  });

  res
    .status(200)
    .json({ success: true, message: "Password reset link sent to email" });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const token = req.params.token;
  console.log("Token received:", token);
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  user.password = password;
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

const updatedAccountDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, phone, address } = req.body;
  console.log("jhvjhsacsaacdscds");

  if (!firstName && !lastName && !username && !phone && !address) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update",
    });
  }

  const existUser = await User.findById(req.user?._id);
  if (!existUser) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  const updateData = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (username) updateData.username = username;
  if (phone) updateData.phone = phone;
  if (address) updateData.address = address;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updateData },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    throw new ApiError(400, "All fields are required");
  }

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
  // console.log("dsvdv:",req.user);
  // console.log("uid:",uid);
  // console.log("scc",email);
  // console.log("name:",name);

  let user = await User.findOne({ email });

  // console.log("user after google: ",user);

  if (!user) {
    // console.log("inside ");

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1] || "";
    const username = email.split("@")[0];
    console.log("firstName: " + firstName);
    console.log("lastName: " + lastName);
    console.log("username: " + username);
    const user1 = await User.create({
      uid: uuidv4(),
      image: { url: picture || "" },
      firstName,
      lastName,
      email,
      username,
    });
    console.log("user1: " + user1);

    const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
      user1._id
    );
    return res
      .status(200)
      .cookie("AccessToken", AccessToken, options)
      .cookie("RefreshToken", RefreshToken, options)
      .json({
        success: true,
        user: user1,
        AccessToken,
        RefreshToken,
        message: "Congratulations, you are registered successfully",
      });
  }

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  return res
    .status(200)
    .cookie("AccessToken", AccessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "None",
    })
    .cookie("RefreshToken", RefreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: "None",
    })
    .json({
      success: true,
      user: user,
      AccessToken,
      RefreshToken,
      message: "logged in successfully",
    });
});

const changeImage = asyncHandler(async (req, res) => {
  try {
    console.log("Updating image...");
    // console.log("Checking if files are uploaded");
    // console.log(req.files);

    let newUserData = {};

    if (req.files && req.files.image) {
      const image = req.files.image;

      const currentImageId = req.user.image ? req.user.image.public_id : null;
      console.log("Current Image ID:", currentImageId);

      if (currentImageId) {
        try {
          await cloudinary.uploader.destroy(currentImageId);
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Error while deleting current image",
          });
        }
      }

      try {
        console.log("cnbvn");
        console.log("safc: ", image.tempFilePath);

        const newImage = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "MusicMate",
        });
        console.log("new image :", newImage);

        newUserData.image = {
          public_id: newImage.public_id,
          url: newImage.secure_url,
        };
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error while uploading new image",
        });
      }
    }

    // console.log("Finding and updating user");

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }).select("-password");

    console.log("User updated:", user.image.url);

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating profile image",
    });
  }
});

const contactUs = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("inside contact us");

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, email, subject, message) are required.",
    });
  }

  try {
    const supportEmailContent = `
      <h2>Contact Us Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email} </p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    const userEmailContent = `
      <h2>Thank you for contacting us, ${name}!</h2>
      <p>We have received your message and will get back to you shortly.</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Your Message:</strong> ${message}</p>
    `;

    await sendEmail({
      email: process.env.SUPPORT_EMAIL,
      subject: `New Contact Us Message: ${subject}`,
      htmlContent: supportEmailContent,
    });

    await sendEmail({
      email,
      subject: "We received your message",
      htmlContent: userEmailContent,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Error in contactUs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try again later.",
    });
  }
});

export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  resetPassword,
  getCurrentUser,
  updatedAccountDetails,
  // updateUserAvatar,
  forgotPassword,
  changePassword,
  fbSignIn,
  changeImage,
  contactUs,
  registerUserviaGoogle,
};
