//

import {
  addRoomToUser
} from "./user"
import {
  Request,
  Response,
  NextFunction
} from "express"
import {
  ROOM,
  ROOMS
} from "../../interfaces/ROOM"
import {
  USER,
  USERS
} from "../../interfaces/USER"
var fs = require("fs");
var path = require("path")
var filepath = path.resolve(__dirname, "../../fakedata.json")
//Read
const readFile = async(file: string = filepath)=> {
  try {
    const res = await fs.readFileSync(path.resolve(__dirname, file), "utf8")


    return JSON.parse(res)
  } catch(e) {
    console.log(e)
    return
  }
}
const cota = async () => {
  let dddr = await readFile("../../fakedata.json")
  return dddr
}

//Create
const addRoom = async(body: any)=> {
  cota()
  .then(async (dat)=> {
    let req = body;
    let dd = dat
    dd.rooms.push(req)
    console.log("2"+dd)
    await fs.writeFile(filepath,
      JSON.stringify(dd),
      (err: any)=> {
        if (err) {
          console.log(err);
          return err
        }
        console.log("saved")
        return dd
      })
  })
}

//Update

const UpdateRoom = async(id: any, body: any)=> {
  cota()
  .then(async (dat)=> {


    let dd = dat.rooms.map((room: any)=> {
      if (room._id === id) {
        room = {
          ...body
        }
      }
    })
    await fs.writeFile(filepath,
      JSON.stringify(dd),
      (err: any)=> {
        if (err) {
          console.log(err);
          return err
        }
        console.log("saved")

      })
  })
}

const deleteRoom = async(id: any)=> {
  cota()
  .then(async (dat)=> {
    let dd = dat.rooms.filter((room: any)=>room._id === id)
    await fs.writeFile(filepath,
      JSON.stringify(dd),
      (err: any)=> {
        if (err) {
          console.log(err);
          return err
        }
        console.log("saved")

      })
  })
}



//req

const room = (req: Request, res: Response, next: NextFunction)=> {

  let socket = req.app.get("socket")
  let io = req.app.get("io")
  if (socket) {
    console.log("client didn't make a request oo")
    socket.on("getRooms", async ()=> {
      console.log(":he")
      readFile()
      .then((rooms: any)=> {
        io.emit("allRooms", rooms.rooms)
      })
      console.log("all rooms if")
    })
    socket.on("addRoom", (name: string, user: object)=> {
      const room = {
        name: name,
        _id: Math.floor(Math.random()*10000),
        members: [],
        messages: []
      }
      addRoom(room)
      .then(()=>io.emit("room added"))
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
}

const addroom = (req: Request, res: Response, next: NextFunction)=> {

  let socket = req.app.get("socket")
  let io = req.app.get("io")
  if (socket) {
    socket.on("addRoom", async (name: string, user: USER)=> {

      const room:ROOM = {
        name: name,
        _id: Math.floor(Math.random()*10000),
        members: [],
        messages: []
      }
      await addRoomToUser(room, user)
      room.members.push(user)
      addRoom(room)
      .then((dd)=> {
        console.log(dd)
        io.emit("room added", room);

      })
      .catch((err)=>console.log(err))
    })

  } else {
    console.log("else")
    io.on("connection", async(socket: any)=> {
      console.log("h")
      socket.on("addRoom", (name: string, user: USER)=> {

        const room:ROOM = {
          name: name,
          _id: Math.floor(Math.random()*10000),
          members: [],
          messages: []
        }
        addRoomToUser(room, user)
        room.members.push(user)
        addRoom(room)
        .then((dd)=> {
          console.log(dd)
          io.emit("room added", room);

        })

      })
    })
  }
  res.render("addRoom", {
    title: "New Room"
  })
}


export {
  cota,
  readFile,
  addRoom,
  UpdateRoom,
  deleteRoom,
  room,
  addroom
}
//
//



//