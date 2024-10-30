import mongoose from "mongoose";
const concertSchema = new mongoose.Schema(
    {
        place:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        peoples:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        addedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true}
)

export const Concert = mongoose.model("Concert",concertSchema)