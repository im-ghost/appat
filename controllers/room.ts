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

const singleRoom = async(req: any, res: Response)=> {
  const roomId = req.params.id;
  const room = await Room.findById(roomId);
  const user = req.user
  if (room) {
    const {
      admin,
      members,
      isDm
    } = room;
    const roomW: Array < any > = await members.map(async(member, i)=> {
      const user = await User.findById(member)
      if (user) {
        room.members[i] = user
      }/*
     / return member
*/
    })
    Promise.all(roomW)
    .then((roomW)=> {
      console.log(roomW)

      res.render("room", {
        room: roomW,
        user: req.user,
        title: room.name
      })
    })
  } else {
    res.redirect("/chats")
  }
}
const addRoom = async (req: any, res: Response)=> {
  const {
    name
  } = req.body;
  const user = req.user;
  const rroom = new Room({
    name: name,
    members: [user._id],
    admin: user._id,
    messages: []
  })

  rroom.save()
  .then(async (room)=> {
    let newRooms = user.room.push(room._id)
    const update = {
      rooms: newRooms
    }
    const filter = {
      _id: user._id
    }
    let doc = await User.findOneAndUpdate(filter, update, {
      returnOriginal: false,
      new: true
    });
    console.log(":done")
    res.redirect(`/chats/chat/${room._id}`)
  }).catch(err=>res.render("error", {
      error: err
    })
  )
}
module.exports = {
  singleRoom,
  addRoom
}
export {
  singleRoom,
  addRoom
}