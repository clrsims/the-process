// nickname validation & updating (server-side component)
import type { RoomState } from "../types"
import NicknameInput from "./nickname";

export default async function LobbyPage() {

    // server components are allowed to await at the top level
    const res = await fetch('http://localhost:3000/api/lobby/state', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error("Failed to fetch lobby state");
    }

    const room: RoomState = await res.json()

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

    // render lobby phase
    function LobbyPhase() {
        return (
            <p>Phase: {room.phase}</p>
        );
    }

    let userID = localStorage.getItem('userID');

    // render start button
    if (room.hostUserId === userID && room.phase === "LOBBY") {
        function StartButton() {
            
            async function handleClick (){

                // LEFT OFF: need state variables for error and success messages
                // finish StartButton UI and verify it works

                const res = await fetch('/api/lobby/start', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID: userID
                    }),
                });

                if (!res.ok) {
                    //handle error
                const { error } = await res.json();
                return;
                }
            }

            return (
                <button onClick={handleClick}>
                    Start the Process!
                </button>
                
            );
        } 
    }

    return (
        <div>
            <RoomCode />
            <LobbyPhase />
            <NicknameInput />
            <UserList />
        </div>
    );
}