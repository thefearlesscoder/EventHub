console.log("sbbshjcd");
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

// change by kunal "*"
app.use(cors({
    origin: "*",
    credentials: true,
}));



app.use(express.json({limit:"20kb"}));

app.use(express.urlencoded({extended: true, limit:"20kb"}))
 
app.use(express.static("public"));

app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }));
  
import userRouter  from "./routes/user.routes.js"
import concertRouter from "./routes/concert.routes.js"


app.use("/api/v1/users", userRouter);
app.use("/api/v1/concert",concertRouter);



export { app };