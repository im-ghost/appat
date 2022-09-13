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
    let members = room.members
    var isthere = false;
    await members.map((member)=> {
      if (member.name === user.name) {
        isthere = true
      }
    })
    if (!isthere) {

      let newRooms = user.room.push(room)
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
      
      let newMembers =room.members.push(room)
      const update2 = {
        members: newMembers
      }
      const filter2 = {
        _id: room._id
      }
      let doc2 = await Room.findOneAndUpdate(filter2, update2, {
        returnOriginal: false,
        new: true
      });
    }
    res.render("room", {
      room: room,
      user: req.user,
      title: room.name
    })
  } else {
    res.redirect("/rooms")
  }
}
const addRoom =async (req: any, res: Response)=> {
  const {
    name
  } = req.body;
  const user = req.user;
  const rroom = new Room({
    name: name,
    members: [user],
    admin: user,
    messages: []
  })

  rroom.save()
  .then(async (room)=> {
    let newRooms = user.room.push(room)
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
    res.redirect(`/rooms/room/${room._id}`)
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