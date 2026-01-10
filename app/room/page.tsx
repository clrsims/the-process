// single UI source of truth (server-side component)
import type { RoomState } from "../types"
import NicknameInput from "./components/lobby/nickname";
import StartButton from "./components/lobby/start";
import UserList from "./components/lobby/userlist";
import ActivityInput from "./components/ideation/activityinput";

export default async function RoomPage() {

    // server components are allowed to await at the top level
    const res = await fetch('http://localhost:3000/api/lobby/state', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error("Failed to fetch room state");
    }

    const room: RoomState = await res.json()

    // render room code
    function RoomCode() {
        return (
            <p>Room Code: {room.roomCode}</p>
        );
    }

    // render lobby phase
    function RoomPhase() {
        return (
            <p>Phase: {room.phase}</p>
        );
    }

    // IF ROOM IS AT LOBBY PHASE
    if (room.phase === "LOBBY") {
        return (

            // pass the room state to client components as props
            <div>
                <RoomCode />
                <RoomPhase />
                <NicknameInput />
                <UserList 
                    users={room.users} 
                    hostUserId={room.hostUserId} 
                />
                <StartButton
                    hostUserId = {room.hostUserId}
                />
            </div>
        );
    }

    else if (room.phase === "IDEATION") {
        return (
            <div>
                <RoomCode />
                <RoomPhase />
            </div>
        );
    }

    else {
        return;
    }


}