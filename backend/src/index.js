import dotenv from "dotenv";
import  connectDB  from "./Database/connectDB.js";
import { app } from "./app.js";
import admin from "firebase-admin";
import { User } from "./Models/User.model.js";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

dotenv.config({ path: "./.env" });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function verifyToken(req, res, next) {
  const idToken =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split("Bearer ")[1]
      : null;

  if (!idToken) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).send("Unauthorized: Token verification failed");
  }
}

app.post("/api/protected", verifyToken, async (req, res) => {
  const { uid, name, email, picture } = req.user;

  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, name, email, picture });
      await user.save();
    }
    res.send(user);
  } catch (error) {
    console.error("Error retrieving or saving user:", error);
    res.status(500).send("Internal Server Error");
  }
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
