const {
  Router
} = require("express")

import {
  Request,
  Response,
  NextFunction
} from "express"
const {
  readFile,
  addRoom,
  addroom,
  room
} = require("../controllers/fake/room")
import {
  ROOM,
  ROOMS
} from "../interfaces/ROOM"
const router = Router();

router.get("/", room)

router.get("/room/:id", (req: Request, res: Response, next: NextFunction)=> {
  res.render("room", {
    title: `Room`
  })
})
router.get("/addRoom", addroom)
module.exports = router