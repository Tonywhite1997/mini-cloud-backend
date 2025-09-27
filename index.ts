import path from "path";
import mongoose from "mongoose";
import { config } from "dotenv";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import http from "http";
const app = require("./app");

config({ path: path.resolve(__dirname, ".env") });

const url: string | undefined = process.env.MONGO_URL;
const PORT: number = 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    // origin: "https://miniycloud.netlify.app",
    // process.env.NODE_ENV === "production"
    //   ? "https://miniycloud.netlify.app"
    //   : "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("add-user", (userID) => {
    if (!users[userID]) {
      users[userID] = socket.id;
      console.log(users);
    }
  });

  socket.on("share-file", ({ data, userID }) => {
    socket.broadcast.emit("receive-share-file", data);

    // const isOnline = Object.keys(users).find((id) => {
    //   return userID === id;
    // });

    // if (isOnline) {
    //   console.log({ online: users[isOnline] });

    //   // io.to(users[isOnline]).emit("receive-share-file", data);
    // } else {
    //   console.log(false);
    // }
  });

  socket.on("revoke-access", ({ data, userID }) => {
    socket.broadcast.emit("alert-revoke-access", data);
    // const isOnline = Object.keys(users).find((id) => {
    //   return userID === id;
    // });

    // if (isOnline) {
    //   console.log({ online: users[isOnline] });

    //   // io.to(users[isOnline]).emit("alert-revoke-access", data);
    // } else {
    //   console.log(false);
    // }
  });

  socket.on("delete-owner-file", (data) => {
    socket.broadcast.emit("alert-file-owner", data);
  });

  socket.on("revoke-my-access", (data) => {
    socket.broadcast.emit("alert-owner-my-access-revoke", data);
  });

  socket.on("disconnect", () => {
    const disconnectedUser = Object.keys(users).find((userId) => {
      return users[userId] === socket.id;
    });

    if (disconnectedUser) {
      delete users[disconnectedUser];
      console.log(`${disconnectedUser} is gone!`);
    }
  });
});

if (url) {
  mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("connected to DB");
      console.log(url);

      server.listen(3000, () => {
        console.log(`app is listening on port 3000`);
      });
    })
    .catch((error) => {
      console.log("error", error);
      console.log(url);
    });
}
