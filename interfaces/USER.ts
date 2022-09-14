//
//
import ROOMS from "./ROOM"
import MEMORIES from "./MEMORIES"
export interface USER {
  _id: any,
  displayName: string,
  firstName: string,
  lastName: string,
  image:string,
  rooms: ROOMS,
  email: string,
  googleId?:any,
  memories:any[],
  friends:any[]
}

export type USERS = USER[]
//
//
//