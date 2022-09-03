const {
  Router
} = require("express")

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

router.get("/", (req: Request, res: Response)=>res.render("rooms"))

router.get("/room/:id", singleRoom)
router.get("/addRoom",addRoom)
module.exports = router

//
//*




/**/