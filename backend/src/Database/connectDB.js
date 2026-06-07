import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        const rawUri = process.env.MONGODB_URI;
        if (!rawUri) throw new Error("MONGODB_URI is not defined");

        const uri = rawUri.trim().replace(/^"|"$/g, "");
        console.log("nndj: ", uri);

        const hasDatabase = /\/[^\/\?]+(\?|$)/.test(uri);
        const connectionString = hasDatabase ? uri : `${uri}/${DB_NAME}`;

        const connectionInstance = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log(`mongodb connection succeeded Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to database :", error);
        process.exit(1);
    }
};

export default connectDB;