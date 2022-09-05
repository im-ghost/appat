const {
  Router
} = require("express")
var path = require("path");

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

router.get("/",ensureAuth, (req: Request, res: Response)=>res.render("rooms"))
router.get("/favicon.png", (req: Request, res: Response)=>res.sendFile(path.join(__dirname, "/images/favecon.png")))

router.get("/room/favicon.png", (req: Request, res: Response)=>res.sendFile(path.join(__dirname, "/images/favecon.png")))
router.get("/room/:id",ensureAuth, singleRoom)
router.post("/addRoom",ensureAuth, addRoom)
router.get("/addRoom",ensureAuth, (req: Request, res: Response)=>res.render("addRoom"))
module.exports = router

//
//*




/**/