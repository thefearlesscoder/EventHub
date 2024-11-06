import dotenv from "dotenv";
import  connectDB  from "./Database/connectDB.js";
import { app } from "./app.js";
import admin from "firebase-admin";

import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

dotenv.config({ path: "./.env" });

import  cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.API_KEY,
  api_secret : process.env.CLOUDINARY_SECRET,

})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


connectDB()
  .then(() => {
    const port = process.env.PORT || 7000;

    app.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
