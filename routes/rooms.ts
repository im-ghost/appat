const {
  Router
} = require("express")

import {
  Request,
  Response,
  NextFunction
} from "express"
const {
  readFile
} = require("../controllers/fake/room")
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction)=> {
  let socket = req.app.get("socket")
  let io = req.app.get("io")
  if (socket) {
    console.log("client didn't make a request oo")
    socket.on("getRooms", async ()=> {
      readFile()
      .then((rooms: any)=> {
        io.emit("allRooms", rooms.rooms)
      })
      console.log("all rooms if")
    })
  } else {
    console.log("else")
    io.on("connection", async(socket: any)=> {
      console.log("h")

      socket.on("getRooms", async ()=> {
        console.log("trying to get all rooma")

        readFile()
        .then((rooms: any)=> {
          io.emit("allRooms", rooms.rooms)
        })
      })
    })
  }
  res.render("rooms", {
    title: "All rooms"
  })
})


router.get("/:id", (req: Request, res: Response, next: NextFunction)=> {
  res.render("room", {
    title: `Room`
  })
})

module.exports = router