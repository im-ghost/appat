//
//
import { ROOMS } from "./ROOM"
import { MEMORIES } from "./MEMORY"
import { NOTIFICATION } from "./NOTIFICATION"
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
  friends:any[],
  notifications:Array<NOTIFICATION>,
  isActive:true | false
}

export type USERS = USER[]
//
//
//