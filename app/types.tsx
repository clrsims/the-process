// const PHASE_TYPES = ['landing', 'lobby', 'round1', 'round2', 'round3', 'results'] as const
// type Phase = typeof PHASE_TYPES[number];

export interface User {
  nickname: string;
  userId: string;
  joinedAt: string; // will be an ISO string
}
  
  // interface RoomState {
  //   readonly roomCode: string;
  //   phase: Phase;
  //   users: User[] | []; // a room can exist before anyone joins
  //   hostUserId: string | null;
  // }
  
export interface LobbyRoomState {
  readonly roomCode: string;
  phase: 'lobby';
  users: User[]; // a room can exist before anyone joins (host creates room, then enters nickname)
  hostUserId: string | null;
  // if hostUserId is set, it must point to one of users[i].userId
}