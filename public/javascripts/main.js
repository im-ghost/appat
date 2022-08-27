//
//
import registerList from "./Components/msg-list.js"
document.addEventListener("alpine:init", ()=> {})
registerList();
var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

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


//
///