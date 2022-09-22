import {
  model,
  Schema,
  Document
} from 'mongoose';
import {
  USER
} from '../interfaces/USER';

const userModel: Schema = new Schema({

  displayName: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  },
  googleId: {
    type: String
  },
  email: {
    type: String
  },
  rooms: {
    type: Array
  },
  password: {
    type: String, 
    required: true
  },
  memories:{
    type:Array
  },
  friends:{
    type:Array
},
notifications:{
  type:Array,
},
isActive:{
  type:Boolean
}
})

module.exports = model < USER & Document > ("User", userModel)