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

router.get("/", ensureAuth, async (req: Request, res: Response)=>
  {
    let chats = await Room.find({})
    if (chats) {
      res.render("chats", {
        title: "Chats",
        chats: chats
      })
    } else {
      console.log(chats)
    }
  })
router.get("/chat/:id", ensureAuth, singleRoom)
router.post("/addRoom", ensureAuth, addRoom)
router.get("/chat/:id", ensureAuth, singleRoom)
router.get("/addRoom", ensureAuth, (req: any, res: Response)=>res.render("addRoom")
router.get("/add", ensureAuth, async (req: any, res: Response)=> {
  const friends = []
  await req.user.friends.map(async(friend, i)=> {
    const friendWithObj = await User.findById(friend)
    friends.push(friendWithObj)
  })
  res.render("add", {
    user: req.user,
    friends: friends
  })})
module.exports = router

//
//*



/**/