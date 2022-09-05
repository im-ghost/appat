//
var Room = require("../models/Room");
var User = require("../models/User");





module.exports = (socket, io)=> {
  /*
  if (!room.members.includes(req.user)) {
    socket.emit("new user", req.user)
  }*/
  socket.on("leave room", (user, room)=> {

    let droom = {
      ...room
    }
    let dUser = {
      ...user
    }
    const newRooms = user.room.filter((rom)=>rom._id === room._id)
    const newUser = {
      ...dUser, rooms: newRooms
    }
    const newMembers = droom.members.filter((ser) => ser._id === user._id)
    const newRoom = {
      ...room, members: newMembers
    }
    Room.findByOneAndUpdate({
      _id: room._id
    }, newRoom, {
      new: true,
      runValidators: true
    })

    User.findByOneAndUpdate({
      _id: user._id
    }, newUser, {
      new: true,
      runValidators: true
    })
    io.emit("left room")
  })
  socket.on("new user", (user,room)=> {
    let droom = {
      ...room
    }
    let dUser ={...user}
    dUser.rooms.push(room)
    droom.members.push(user)
    const newMembers = droom.members;
    const newRoom = {
      ...room, members: newMembers
    }
    
    
    Room.findByOneAndUpdate({
      _id: room._id
    },
      newRoom,
      {
        new: true,
        runValidators: true
      })
    
    Room.findByOneAndUpdate({
      _id: user._id
    },
      dUser,
      {
        new: true,
        runValidators: true
      })
  })
  socket.on("send message", (room,msg)=> {
    console.log(msg)
    let droom = {
      ...room
    }
    droom.messages.push(msg)
    const newMessages = droom.messages;
    const newRoom = {
      ...room, messages: newMessages
    }
    Room.findByOneAndUpdate({
      _id: room._id
    },
      newRoom,
      {
        new: true,
        runValidators: true
      })

  })
}