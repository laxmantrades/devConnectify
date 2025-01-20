const socket = require("socket.io");
const crypto = require("crypto");
const chatSchema = require("../models/chatSchema");

const hashRoomId = (userId, targetUserId) => {
  return crypto
    .createHash(process.env.HASH_ALGORITHM)
    .update([userId, targetUserId].sort().join("_"))
    .digest(process.env.DIGEST_FORMAT);
};
const initializeSocket = (server) => {
  io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      //create a roomID and join
      const roomId = hashRoomId(userId, targetUserId);

      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ firstName,lastName,photoUrl, userId, targetUserId, text }) => {
        try {
            
          const roomId = hashRoomId(userId, targetUserId);
          let chat = await chatSchema.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new chatSchema({
              participants: [userId, targetUserId],
              message: [],
            });
          }
          chat.messages.push ( {
            senderId: userId,
            text: text,
          },) 
           
          
          await chat.save();

          //send the message in the room
          io.to(roomId).emit("messageReceived", { firstName,lastName,photoUrl, text });
        } catch (error) {
          console.log(error);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
