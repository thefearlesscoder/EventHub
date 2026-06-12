import mongoose from "mongoose";
import { User } from "./src/Models/User.model.js";
import dotenv from "dotenv";
dotenv.config();

const checkDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({ email: "admin@dummy.com" });
    console.log("Found admins:", users.length);
    for (const u of users) {
      console.log(`- ID: ${u._id}, Email: ${u.email}, PasswordHash: ${u.password}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};
checkDb();
