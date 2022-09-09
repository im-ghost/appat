(()=>{
  const btn = document.querySelector("#send")
let {
  value: room
} = document.querySelector("#room")
let {
  value: user
} = document.querySelector("#user")
room = JSON.parse(room)
user = JSON.parse(user)
console.log(room)
console.log(user)
const send = (e)=> {
  
const {
  value
} = document.querySelector("#message")
  const msg = {
    text: value,
    sender: user,
    time: new Date()
  }
   room.messages.push(msg)
  socket.emit("send message",room)
  console.log(e)
}
btn.addEventListener("click", send)



//
})();