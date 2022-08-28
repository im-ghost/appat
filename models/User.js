const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
  name:{type:String},
  email:{type:String},
  rooms:{type:Array}
})

module.exports = mongoose.model("User", userModel)