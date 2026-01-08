import { NextResponse } from "next/server";
import { User } from "../../../types"
import { ROOM } from "../../../../app/server/lobby"

// LOBBY JOIN INVARIANTS
// 1. Nickname not empty
// 2. Nickname length <= 10
// 3. Nickname unique within the room
// 4. If this is first user hostUserId becomes their userId
// 5. hostUserId must always refer to a real user (or its null)

// When a join request comes in, the server:
// 1. Looks at the room’s user list.
// 2. Searches for an existing user with the same userId.
// * If found, it updates that user’s nickname.
// * If not found, it creates a new user entry with that userId.

export async function POST(request: Request) {
    const body = await request.json() 

    let nickname = body.nickname;
    let userID = body.userID;
    let joinedAt = body.joinedAt;

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
    
    if (userID) {
        // If user already exists with the same userID, update the user's nickname
        if (ROOM.users.some(user => user.userId === userID)) {
            const existing = ROOM.users.find(u => u.userId === userID);
            if (existing) {
                existing.nickname = nickname;
            }
        } else { // If userID hasn't created a nickname, create a new User.
            // if this is first user, hostUserId becomes their userId
            if (ROOM.users.length == 0) {
                ROOM.hostUserId = userID;
            }

            // creates a new user
            const newUser: User = {
                nickname: nickname,
                userId: userID,
                joinedAt: joinedAt
            };

            // appends the user to the current room
            ROOM.users.push(newUser);
        }
    }

    // DEBUG
    console.log("JOIN: saved room", ROOM);

    return NextResponse.json(ROOM, {status: 200});
}