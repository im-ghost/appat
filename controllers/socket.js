//
var Room = require("../models/Room");
var User = require("../models/User");





module.exports = (socket, io)=> {
   require("../socket/room")(socket,io)
   require("../socket/user")(socket,io)
   require("../socket/memories")(socket,io)
  
}