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
  user: {
    type: String,
    required: true
  },
  reactions: {
    type: Array,
    required: true
  }
})

module.exports = model < MEMORY & Document > ("Memory", memoryModel)