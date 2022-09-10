const {
  Router
} = require("express")
var path = require("path");
var Room = require("../models/Room")
const {
  ensureAuth,
  ensureGuest
} = require('../Middlewares/auth');

import {
  Request,
  Response,
  NextFunction
} from "express"
import {
  ROOM,
  ROOMS
} from "../interfaces/ROOM"
import {
  addRoom,
  singleRoom
} from "../controllers/room"
const router = Router();

router.get("/",ensureAuth, async (req: Request, res: Response)=>
{
  let rooms = await Room.find({})
  if(rooms){
  res.render("rooms",{
    title:"Rooms",
    rooms:rooms
  })
}
 else{
   console.log(rooms)
 }
})
router.get("/favicon.png", (req: Request, res: Response)=>res.sendFile(path.join(__dirname, "/images/favecon.png")))

router.get("/room/favicon.png", (req: Request, res: Response)=>res.sendFile(path.join(__dirname, "/images/favecon.png")))
router.get("/room/:id",ensureAuth, singleRoom)
router.post("/addRoom",ensureAuth, addRoom)
router.get("/addRoom",ensureAuth, (req: Request, res: Response)=>res.render("addRoom"))
module.exports = router

//
//*




/**/