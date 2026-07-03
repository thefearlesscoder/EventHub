// console.log("sbbshjcd");
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.routes.js"
import concertRouter from "./routes/concert.routes.js"
import friendRouter from "./routes/friends.routes.js"
import messageRouter from "./routes/message.routes.js"
import chatRouter from "./routes/chat.routes.js"

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL
        ? [...process.env.CLIENT_URL.split(","), "http://localhost:5173", "https://eventhub-frontend-eo32.onrender.com", "https://eventhub.thefearlesscoder.site"]
        : ["http://localhost:5173", "https://eventhub-frontend-eo32.onrender.com", "https://eventhub.thefearlesscoder.site"],
    credentials: true
}));

app.use(express.json({ limit: "20kb" }));

app.use(express.urlencoded({ extended: true, limit: "20kb" }))

app.use(express.static("public"));

app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/concert", concertRouter);
app.use("/api/v1/friends", friendRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/chat", chatRouter);


export { app };