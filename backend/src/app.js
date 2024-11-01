console.log("sbbshjcd");
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// change by kunal "*"
app.use(cors({
    origin: "*",
    credentials: true,
}));



app.use(express.json({limit:"20kb"}));

app.use(express.urlencoded({extended: true, limit:"20kb"}))
// files folder store in server 
app.use(express.static("public"));
// for cookie 
app.use(cookieParser());// read nd access cookie

// routes

import userRouter  from "./routes/user.routes.js"
import concertRouter from "./routes/concert.routes.js"
// routes declarations

app.use("/api/v1/users", userRouter);
app.use("/api/v1/concert",concertRouter);



export { app };