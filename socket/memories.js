//
var Room = require("../models/Room");
var User = require("../models/User");
var Memories = require("../models/memories");






module.exports = (socket, io)=> {

  socket.on("addMemory", async(userId, memory)=> {
    const user = await User.findById(userId);
    if (user) {
      let memory = await new Memory(body)
      if(memory){
      //io.emit("newMemory",memory)
      io.emit("success")
      }
    }

  })
  socket.on("memories",
    async (userId)=> {
      const user = await User.findById(userId);
      if (user) {
        const friendsId = user.friends

        let friends = []
        friendsId.map(async (id)=> {
          let user = await User.findById(id);
          if (user) {
            friends.push(user)
          }
        })
        const allMemories = [];
        friends.map((friend)=> {
          friend.memories.map((memory)=> {
            allMemories.push(memory)
          })
        })

        const memories = [...allMemories, user.memories]
        io.emit("allMemories",
          memories)
      }

    })
  socket.on("delmemory", async (userId,
    memoryId)=> {
    const user = await User.findById(userId);
    if (user) {
      const memory = await Memory.findById(memoryId)
      if (memory) {
        if (memory.user === user._id) {
          const newMemories = user.memories.filter(mem=>mem._id !== memory._id)
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
          await Memory.findByIdAndRemove(memoryId)
        } else {
          io.emit("notAuthorized")
        }

      }
    }/*
    io.emit("allMemories",
      memories)*/
  })
  socket.on("editmemory",
    async (userId,
      memoryId, body)=> {
      const user = await User.findById(userId);
      if (user) {
        const memory = await Memory.findById(memoryId)
        if (memory) {
          if (memory.user === user._id) {
            const update = {
              body
            }
            const filter = {
              _id: memory._id
            }
            let doc = await Memory.findOneAndUpdate(filter, update, {
              returnOriginal: false,
              new: true
            });
          } else {
            io.emit("notAuthorized")
          }

        }
      }/*
      io.emit("allMemories",
        memories)*/
    })
}