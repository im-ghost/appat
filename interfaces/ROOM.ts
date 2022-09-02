//
//
import USERS from "./USER"
import MSGS from "./MSG"
export interface ROOM {
  _id: any,
  name: string,
  members: USERS,
  messages: MSGS,
  admin:USER
}

export type ROOMS = ROOM[]
//
//
//