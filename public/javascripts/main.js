//
//

import registerList from "./Components/msg-list.js"
import Rooms from "./pages/rooms.js"
document.addEventListener("alpine:init", ()=> {
  alert("Hi alpine")
  window.Alpine = Alpine
})
registerList();
var roomcalled = false;
var socket = io();
(()=> {
  window.socket = socket;
  socket.emit("getRooms")
})()
socket.on("allRooms", (rooms)=> {

  Rooms(rooms,Alpine)
  roomcalled = true
})/*
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
/*
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  var item = `<chat-msg text=${msg} time=${new Date()}></chat-msg>`
  messages.innerHTML += item;
  window.scrollTo(0, document.body.scrollHeight);
});

*/
//
///