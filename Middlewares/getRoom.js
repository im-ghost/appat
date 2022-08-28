const Room = require("../models/Room")
const User = require("../models/User")



module.exoorts = (req, res, next)=> {
  const roomId = req.params.id;
  const room = Room.findById(roomId)
  if (req.user.rooms.includes(room)) {
    
  } else {
    const newMembers = [...room.members]
    newMembers.push(req.user)
    const updatedRoom = {
      ...room,
      members: newMembers
    }
    Room.findByIdAndUpdate(room._id, updatedRoom)
  }
  req.room = room


  next();
}