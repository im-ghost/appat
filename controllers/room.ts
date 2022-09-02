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


const singleRoom = async(req: Request, res: Response)=> {
  const roomId = req.params.id;
  const room = await Room.findById({
    id: roomId
  });
  if (room) {
    res.render("room", {
      room: room
    })
  } else {
    res.redirect("/rooms")
  }
}
const addRoom = (req: Request, res: Response)=> {
  const { name,user} = req.body;
  let room = new Room({
    name:name,
    members:[user],
    admin:user,
    messages:[]
  })
  .exex((err:any,room:Room)=>{
    if(err){
      console.log(err)
      res.render("addRoom")
    }
    
    console.log(":done")
    res.redirezt(`/rooms/room/${room._od}`)
  })
}
module.exports = {
  singleRoom,
  addRoom
}