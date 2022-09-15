//
//
import { ROOM } from "./ROOM"
import { USER } from "./USER"
export interface MSG {
  text: string,
  sender: USER,
  time: Date,
}

export type MSGS = MSG[]
//
//
//