const PHASE_TYPES = ['LANDING', 'LOBBY', 'IDEATION', 'YEA OR NAY', 'VOTING', 'RESULTS'] as const
type Phase = typeof PHASE_TYPES[number];

export interface User {
  nickname: string;
  userId: string;
  joinedAt: string; // will be an ISO string
}
  
export interface RoomState {
  readonly roomCode: string;
  phase: Phase;
  users: User[]; // a room can exist before anyone joins
  hostUserId: string | null;
  phaseMeta: {
    endsAt?: string;
  };
}