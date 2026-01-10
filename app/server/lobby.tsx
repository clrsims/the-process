import { User, RoomState } from "../types"

export const user1: User = {
  nickname: "swagmaster69",
  userId: "9ADC34",
  joinedAt: "2013-07-19T04:52:31.847Z"
};

// Define the shape we’ll cache on globalThis
const globalForRoom = globalThis as unknown as {
  ROOM?: RoomState;
};

// Create it once, reuse thereafter
export const ROOM =
  globalForRoom.ROOM ??
  (globalForRoom.ROOM = {
    roomCode: "6RUJ72",
    phase: "LOBBY",
    users: [],
    activities: [],
    hostUserId: null,
    phaseMeta: {
      endsAt: undefined
    }
  });