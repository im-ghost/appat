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
const router = Router();

router.get("/", (req: Request,res: Response)=>res.render("rooms"))

router.get("/room/:id", (req: Request, res: Response, next: NextFunction)=> {
  res.render("room", {
    title: `Room`
  })
})
router.get("/addRoom", (req: Request,res:Response)=>res.render("addRoom"))
module.exports = router