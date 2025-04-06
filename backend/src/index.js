import dotenv from "dotenv";
import  connectDB  from "./Database/connectDB.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

// import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

dotenv.config({ path: "./.env" });

import  cloudinary from "cloudinary"
import { log } from "console";

cloudinary.v2.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.API_KEY,
  api_secret : process.env.CLOUDINARY_SECRET,

})

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });


connectDB()
  .then(() => {
    const port = process.env.PORT || 7000;

    app.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });

    const server = createServer(app) ;
    
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5173",
      },
    });

    io.on("connection" ,(socket) => {
      console.log("conneected to socket.io") ;
      
      socket.on("setup" , (userData) => {
        // console.log( "user in mesage -> " , userData)
        if ( userData ){
          socket.join(userData._id) ;
          console.log(userData._id) ;
          socket.emit("connected")
        }
      })


      socket.on('joinchat' , (room) => {
        socket.join(room) ;
        console.log("user joins the room " + room ) ;
      })

      socket.on("newmessages" , (gotmessage) => {
        // console.log("message began send , ", newmessage ) ;
        var chat = gotmessage.chat ;
        // console.log("chat" , chat ) ;
        if ( chat.users.length != 2  ) return console.log("chat users not define");
        // console.log("hello") ;
        // console.log( chat.users ) ;

        chat.users.forEach((user) => {
            console.log("user:", user);
    
            // If _id exists, emit the message to the room; otherwise, log an error
            if (user._id  !== gotmessage.sender._id) {
                console.log("Emitting message to user._id:", user._id);
                socket.in(user._id).emit("messagerecieve", gotmessage);
            } else {
                console.log("user._id is undefined for", user);
            }
        });

      })

    })

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
