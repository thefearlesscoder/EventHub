// console.log("sbbshjcd");
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

const app = express();

// change by kunal "*"
app.use(cors({
    origin: "http://localhost:5173",
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
import friendRouter from "./routes/friends.routes.js"
import messageRouter from "./routes/message.routes.js"
import chatRouter from "./routes/chat.routes.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/concert",concertRouter);
app.use("/api/v1/friends", friendRouter);
app.use("/api/v1/message" , messageRouter ) ;
app.use("/api/v1/chat" , chatRouter ) ;

Sentry.setupExpressErrorHandler(app);

export { app };