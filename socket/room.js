//
var Room = require("../models/Room");
var User = require("../models/User");





module.exports = (socket, io)=> {
  socket.on("leave room", (user, room)=> {})
  socket.on("new user", (user, room)=> {})
  socket.on("send message", async (room)=> {
    const update = {
      messages: room.messages
    }
    const filter = {
      _id: room._id
    }
    let doc = await Room.findOneAndUpdate(filter, update, {
      returnOriginal: false,
      new: true
    });
   
  })
}