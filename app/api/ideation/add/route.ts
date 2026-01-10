import { NextResponse } from "next/server";
import { Activity } from "../../../types";
import { ROOM } from "../../../server/lobby";

export async function POST(request: Request) {
    const body = await request.json();

    let activityName = body.activity;
    let userID = body.userID;
    const createdAt = new Date().toISOString();
    const activityID = crypto.randomUUID();

    if (activityName.trim() === "") { // activity empty
        return NextResponse.json(
            {error: "No activity entered, please try again."},
            {status: 400}
        );
    } else if (activityName.length > 80) { // activity must be less than 80 characters
        return NextResponse.json(
            {error: "Activity must be 30 characters or less, please try again."},
            {status: 400}
        );
    } else if (ROOM.activities.some(activity => activity.name.toLowerCase().trim() === activityName.toLowerCase().trim())) {
        return NextResponse.json( // activity not unique
            {error: "Activity is not unique, please try again."},
            {status: 400}
        );
    } else {
        // creates a new activtiy 
        const newActivity: Activity = {
            id: activityID,
            name: activityName,
            createdByUserID: userID,
            createdAt: createdAt
        };

        ROOM.activities.push(newActivity);

        return NextResponse.json(ROOM, {status: 200});
    }

}