import { NextResponse } from "next/server";
import { User } from "../../../types"
import { ROOM } from "../../../../app/server/lobby"

// LOBBY JOIN INVARIANTS
// 1. Nickname not empty
// 2. Nickname length <= 10
// 3. Nickname unique within the room
// 4. If this is first user hostUserId becomes their userId
// 5. hostUserId must always refer to a real user (or its null)

// request looks something like this: 
// {
//     "nickname": "Chris"
// }

export async function POST(request: Request) {
    const body = await request.json()
    const { nickname } = body;

    // nickname empty
    if (nickname == "") {
        return NextResponse.json(
            {error: "No nickname entered, please try again."},
            {status: 400}
        );
    } 
    
    if (nickname.length > 10) { // nickname greater than 10 characters
        return NextResponse.json(
            {error: "Nickname must be 10 characters or less, please try again."},
            {status: 400}
        );
    } 

    if (ROOM.users.some(user => user.nickname === nickname)) { // nickname not unique
        return NextResponse.json(
            {error: "Nickname is not unique, please try again."},
            {status: 400}
        );
    }

    // generates unique user ID and creates new joinedAt date
    const userId = crypto.randomUUID();
    const joinedAt = new Date().toISOString();    

    // if this is first user, hostUserId becomes their userId
    if (ROOM.users.length == 0) {
        ROOM.hostUserId = userId;
    }

    // creates a new user
    const newUser: User = {
        nickname: nickname,
        userId: userId,
        joinedAt: joinedAt
    };

    // appends the user to the current room
    ROOM.users.push(newUser)

    return NextResponse.json(ROOM, {status: 200});
}