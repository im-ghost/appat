const btn = document.querySelector("#send")
/*
class ObjectId {
  constructor(id) {
    this.id = id
  }
  value() {
    return this.id
  }
}*/
const {
  value
} = document.querySelector("#message")
const {
  value: room
} = document.querySelector("#room")
const {
  value: user
} = document.querySelector("#user")
console.log(room)
console.log(user)
const send = (e)=> {
  const msg = {
    text: value,
    send: user,
    time: new Date()
  }
  socket.emit("send message", msg, room)
  console.log(e)
}
btn.addEventListener("click", send)



//