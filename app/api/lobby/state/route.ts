// this route is read-only

// I am building an API endpoint that is mapped to a fixed URL, 
// and when that URL is requested, the server returns the current LobbyRoomState as JSON.

import { NextResponse } from "next/server";
import { ROOM } from "../../../../app/server/lobby"

export async function GET() {

    // DEBUG
    console.log("STATE: returning room", ROOM);

    return NextResponse.json(ROOM);
}