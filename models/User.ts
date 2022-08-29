import {
  model,
  Schema,
  Document
} from 'mongoose';
import {
  USER
} from '@interfaces/USER';

const userModel: Schema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  rooms: {
    type: Array
  }
})

module.exports = model <USER & Document> ("User", userModel)