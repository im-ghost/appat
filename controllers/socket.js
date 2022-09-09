//
var Room = require("../models/Room");
var User = require("../models/User");





module.exports = (socket, io)=> {
   require("../socket/room")(socket,io)
  
}