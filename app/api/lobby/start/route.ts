import { NextResponse } from "next/server";
import { ROOM } from "../../../../app/server/lobby"


// Request body - 
// "userID" = userID
//

export async function POST(request: Request) {
    const body = await request.json()
    let userID = body.userID;

    if (ROOM.hostUserId != userID) { // only the host can start
        return NextResponse.json(
            {error: "Only the host can start!"},
            {status: 400}
        );
    } else { // host starts the process
        ROOM.phase = "IDEATION";
        ROOM.phaseMeta = {};

        console.log("current room: ", ROOM);

        return NextResponse.json(
            {status: 200}
        );
    }
}