//
import {
  Request,
  Response,
  NextFunction
} from "express"
import {
  USER,
  USERS
} from "../interfaces/USER"
import {
  ROOM,
  ROOMS
} from "../interfaces/ROOM"
import {
  MSG,
  MSGS
} from "../interfaces/MSG"
var User = require("../models/User");
var Room = require("../models/Room");

const sock = (req: any, room: ROOM)=> {
  const socket = req.app.get("socket")
  const io = req.app.get("io")
  const user = req.user;

  if (socket) {
    socket.on("new user", (user)=> {
      let droom = {
        ...room
      }
      droom.members.push(user)
      const newMembers = droom.members;
      const newRoom = {
        ...room, members: newMembers
      }
      Room.findByOneAndUpdate({
        _id: room._id
      }, newRoom, {
        new: true,
        runValidators: true
      })
      .exec((err, room)=> {
        if (err) {
          io.emit("error", err)
        } else {
          io.emit("message sent")
        }
      })
    })
    socket.on("send message", (msg)=> {
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
      .exec((err,
        room)=> {
        if (err) {
          io.emit("error", err)
        } else {
          io.emit("message sent")
        }
      })

    })
  } else {
    io.on("connection", (socket: any) => {

      socket.on("new user", (user)=> {
        let droom = {
          ...room
        }
        droom.members.push(user)
        const newMembers = droom.members;
        const newRoom = {
          ...room, members: newMembers
        }
        Room.findByOneAndUpdate({
          _id: room._id
        }, newRoom, {
          new: true,
          runValidators: true
        })
        .exec((err, room)=> {
          if (err) {
            io.emit("error", err)
          } else {
            io.emit("message sent")
          }
        })
      })
      socket.on("send message", (msg)=> {
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
        .exec((err,
          room)=> {
          if (err) {
            io.emit("error", err)
          } else {
            io.emit("message sent")
          }
        })

      })
    })
  }
}
const singleRoom = async(req: any, res: Response)=> {
  const roomId = req.params.id;
  const room = await Room.findById({
    id: roomId
  });
  if (room) {
    res.render("room", {
      room: room,
      user: req.user
    })
    sock(req, room)
  } else {
    res.redirect("/rooms")
  }
}
const addRoom = (req: any, res: Response)=> {
  const {
    name
  } = req.body;
  const user = req.user;
  let room = new Room({
    name: name,
    members: [user],
    admin: user,
    messages: []
  })
  .exex((err: any, room: ROOM)=> {
    if (err) {
      console.log(err)
      res.render("addRoom")
    }

    console.log(":done")
    res.redirect(`/rooms/room/${room._id}`)
  })
}
module.exports = {
  singleRoom,
  addRoom
}
export {
  singleRoom, addRoom
}