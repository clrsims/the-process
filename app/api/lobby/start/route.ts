import { NextResponse } from "next/server";
import { User } from "../../../types"
import { ROOM } from "../../../../app/server/lobby"


// Request body - 
// "userID" = userID
//

export async function POST(request: Request) {
    const body = await request.json()
    let userID = body.userId;

    if (ROOM.hostUserId != userID) { // only the host can start
        return NextResponse.json(
            {error: "Only the host can start!"},
            {status: 400}
        );
    } else if (ROOM.phase != "LOBBY") { // must be in lobby phase to start
        return NextResponse.json(
            {error: "You can start in Lobby phase."},
            {status: 400}
        );
    } else { // host starts the process
        ROOM.phase = "IDEATION";
        ROOM.phaseMeta = {};
    }
}