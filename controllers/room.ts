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
  if (roomId !== "favicon.png") {
    const room = await Room.findById(roomId);
    const {
      _id: id
    } = req.user
    const {
      _id: rid
    } = room;
    const user = req.user
     user._id = id.str;
    const rroom = room;
     rroom._id = rid.str;
    if (room) {
      console.log(rroom)
      res.render("room", {
        room: rroom,
        user: user,
        title: room.name
      })
    } else {
      res.redirect("/rooms")
    }} else {
    console.log(req.params)
    console.log(req.param("id"))
  }
}
const addRoom = (req: any, res: Response)=> {
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
  .then((room)=> {

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