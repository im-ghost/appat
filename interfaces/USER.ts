//
//
import ROOMS from "./ROOM"
export interface USER {
  _id: any,
  displayName: string,
  firstName: string,
  lastName: string,
  image:string,
  rooms: ROOMS,
  email: string,
  googleId?:any,
}

export type USERS = USER[]
//
//
//