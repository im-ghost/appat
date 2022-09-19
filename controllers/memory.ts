import {
  Request,
  Response,
  NextFunction
} from "express"
import {
  USERS
} from "../interfaces/USER"
import {
  MEMORIES
} from "../interfaces/MEMORY"
const Memory = require("../models/memory")
const User = require("../models/User")
const allMemories = async (req: any, res: Response)=>
{
  const user = req.user
  const friendsId = user.friends

  let friends: USERS = []
  await friendsId.map(async (id)=> {
    let user = await User.findById(id);
    if (user) {
      friends.push(user)
    }
  })
  const allMemories: MEMORIES = [];
  await friends.map((friend)=> {
    friend.memories.map((memory)=> {
      allMemories.push(memory)
    })
  })
  let memories: MEMORIES = [...allMemories, ...user.memories]
  const memoriesWithObj: Array < any > = await memories.map(async(memory)=> {
    let userId = memory.user;
    const user = await User.findById(userId)
    if (user) {
      memory.userObj = user
    }/*
    memoriesWithObj.push(memory)*/
    return memory

  })
Promise.all(memoriesWithObj)
.then((memoriesWithObj)=>{
  console.log(memoriesWithObj)

  res.render("memories",
    {
      title: "Memories",
      user: req.user,
      memories: memoriesWithObj
    })
})
}

const addMemory = async (req: any, res: Response)=> {
  const {
    title,
    body,

  } = req.body;
  const user = req.user;
  const memory = new Memory({
    title: title,
    user: user._id,
    body: body,
    date: new Date
  })

  if (memory) {
    memory.save()
    .then(async (memory)=> {

      const newMemories = [...user.memories, memory]
      const update = {
        memories: newMemories
      }
      const filter = {
        _id: user._id
      }
      let doc = await User.findOneAndUpdate(filter, update, {
        returnOriginal: false,
        new: true
      });
      console.log(doc)
      console.log(":done")
      res.redirect(`/memories/memory/${memory._id}`)
    })
  }

}
module.exports = {
  allMemories,
  addMemory
}
export {
  allMemories,
  addMemory
}