import mongoose from "mongoose";

const concertSchema = new mongoose.Schema(
  {
    adminId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true, 
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /\d{6}/.test(v); 
        },
        message: props => `${props.value} is not a valid pincode!`
      },
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function(v) {
          return v > Date.now(); 
        },
        message: 'Concert date must be in the future!'
      },
    },
    peoples: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0, 
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 0, 
    },
    genre: {
      type: String,
      enum: ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop", "Electronic" , "Genz", "Other"], 
    },
    media: {
      images: [
        {
          type: String, 
        },
      ],
      videos: [
        {
          type: String, 
        },
      ],
    },
  },
  { timestamps: true }
);



export const Concert = mongoose.model("Concert", concertSchema);
