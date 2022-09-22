import {
  model,
  Schema,
  Document
} from 'mongoose';
import {
  MEMORY
} from '../interfaces/MEMORY';

const memoryModel: Schema = new Schema({

  title: {
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: Date
  },
  user: {
    type: String,
    required: true
  },
  likes: {
    type: Array
  }
  comments: {
    type: Array
  }
})

module.exports = model < MEMORY & Document > ("Memory", memoryModel)