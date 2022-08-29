//
//
import ROOMS from "./ROOM"
export interface USER {
  _id: any,
  name: string,
  rooms: ROOMS,
  email: string
}

export type USERS = USER[]
//
//
//