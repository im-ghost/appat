//
//
import {
  USER
} from "./USER"
export interface MEMORY {
  _id: any,
  user: String,
  title: String,
  body: String,
  reactions: any[],
  userObj?:USER
}

export type MEMORIES = MEMORY[]
//
//
//,