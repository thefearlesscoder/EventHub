// import mongoose, { Schema } from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// const userSchema = new Schema(
//   {
//     uid: {
//       type: String,
//       // required: true,
//       unique: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName:{
//       type: String,
//       required: true,
//     },
    
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     username: {
//       type: String,
//       // required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     // confirmPassword:{
//     //   type: String,
//     //   required: true,
//     // },
//     attented_concerts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Concert",
//       },
//     ],
//     upcoming_attendconcert:[
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Concert",
//       },
//     ],
//     friends:{
//       type: [Schema.Types.ObjectId],
//       ref: "User",
//     },
    
//     phone: {
//       type: String,
//       // required: true,
//     },
//     address: {
//       street: {
//         type: String,
//         // required: true,
//         trim: true
//       },
//       city: {
//         type: String,
//         // required: true,
//         trim: true
//       },
//       state: {
//         type: String,
//         // required: true,
//         trim: true
//       },
//       zipCode: {
//         type: String,
//         // required: true,
//         trim: true
//       },
//       country: {
//         type: String,
//         // required: true,
//         trim: true
//       },
//     role: {
//       type: String,
//       default: "user",
//       enum:["user", "admin"],// admin to add concert
//     },
    
//     image: {
//       type: String,
//     },
//     refreshToken: {
//       type: String,
//     },
//     resetPasswordToken: {
//       type: String,
//     },
//     resetPasswordExpires: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = async function (next) {
//   return jwt.sign(
//     {
//       _id: this._id,
//       role: this.role,
//       firstName: this.firstName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = async function (next) {
//   return jwt.sign(
//     {
//       _id: this._id,
//       role: this.role,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
//     }
//   );
// };

// export const User = mongoose.model("User", userSchema);


import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    name: String,
    firstName: {
      type: String,
      required: true,
    },
    picture: String,
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true, // check it
    },
    password: {
      type: String,
      required: true,
    },
    attented_concerts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Concert",
      },
    ],
    upcoming_attendconcert: [
      {
        type: Schema.Types.ObjectId,
        ref: "Concert",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    phone: {
      type: String,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"], // admin to add concert
    },
    myAddedConcerts: {
      type: [Schema.Types.ObjectId],
      ref: "Concert",
    },
    image: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      firstName: this.firstName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};

export const User = mongoose.model("User", userSchema);
