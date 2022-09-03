import { model, Schema, Document } from 'mongoose';
import { ROOM } from '../interfaces/ROOM';

const userModel:Schema = new Schema({
  name: {
    type: String
  },
  members: {
    type: Array
  },
  messages:{
    type:Array
  },
  admin:{
    type: Object,
    required:true
  }
})

module.exports = model <ROOM & Document>("Room", userModel)