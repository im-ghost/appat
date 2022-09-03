const btn = document.querySelector("#send")
const {
  value
} = document.querySelector("#message")
const {
  value: user
} = document.querySelector("#user")
const send = (e)=> {
  const msg = {
    text: value,
    send: user,
    time: new Date()
  }
  socket.emit("send message", msg)
}
btn.addEventListener("click", send)

Alphine.data("roompage",({
  desc:false,
  main:true,
  toggle(){
    this.main = !this.main
  }
}))



//