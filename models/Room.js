const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
  name: {
    type: String
  },
  members: {
    type: Array
  }
})

module.exports = mongoose.model("Room", userModel)