import type { LobbyRoomState } from "../types"
import NicknameInput from "./nickname";

export default async function LobbyPage() {
    // server components are allowed to await at the top level
    const res = await fetch('http://localhost:3000/api/lobby/state', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error("Failed to fetch lobby state");
    }

    const room: LobbyRoomState = await res.json()

    // render user list (empty at first) & host label
    function UserList() {
        const userList = room.users.map(user =>

            <li 
                key={user.userId}
                style= {{
                    // if user is the host, denote it by coloring his name red
                    color: user.userId === room.hostUserId ? 'red' : 'white'
                }}
            >
                {user.nickname}
            </li>
        );

        return (
            <ol>{userList}</ol>
        );
    }

    // render room code
    function RoomCode() {
        return (
            <p>Room Code: {room.roomCode}</p>
        );
    }

    return (
        <div>
            <RoomCode />
            <NicknameInput />
            <UserList />
        </div>
    );
}