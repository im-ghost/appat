//
import {
  cota
} from "./room"

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
export const addRoomToUser = async(room: ROOM, user: USER)=> {
  var id = user._id;
  cota()
  .then(async (dat)=> {

    let dd = {
      ...dat
    }
    let duser = dd.users.find((use: USER)=> use._id === id)
     duser.rooms.push(room)
     console.log(duser)
    let newUser = {...duser}
    let allUsers =  dd.users.filter((usee:USER)=>usee._id !== id);
    let newUsers = allUsers.push(newUser)
    
    let res = {
      ...dat, users: newUsers
    }
    console.log(res)
    await fs.writeFile(filepath,
      JSON.stringify(res),
      (err: any)=> {
        if (err) {
          console.log(err);
          return err
        }
        console.log("saved")

      })
  })
}

module.exports = {
  addRoomToUser
}

//