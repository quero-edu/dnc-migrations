import { Hotel } from "./Hotel"
import { Reservation } from "./Reservation"

export type Role = 'ADMIN' | 'USER'

export type User = {
  id: number,
  email: string,
  name: string,
  role: Role,
  avatar: string | null,
  image: string | null,
  createdAt: string,
  password?: string,
}

export type UserProfile = User & {
  lastReservation?: Reservation
  hotels?: Hotel[]
}