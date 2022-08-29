const Room = require("../models/Room")
const User = require("../models/User")

import {
  Request,
  Response,
  NextFunction
} from "express"

import {ROOM} from "../interfaces/ROOM"
import {USERS} from "../interfaces/USER"

module.exoorts = (req: Request, res: Response, next: NextFunction)=> {
  const roomId = req.params.id;
  const room:ROOM = Room.findById(roomId)
  if (req.user.rooms.includes(room)) {} else {
    const newMembers:USERS = [...room.members]
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