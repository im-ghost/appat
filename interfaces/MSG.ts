//
//
import ROOM from "./ROOM"
import USER from "./USER"
export interface MSG {
  text: string,
  room: ROOM,
  sender: USER
}

export type MSGS = MSG[]
//
//
//