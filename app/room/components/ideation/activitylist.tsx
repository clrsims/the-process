'use client';

// render user list (empty at first) & host label
export default function ActivityList({
    activities,
}: {
    activities: {id: string, name: string, createdByUserID: string, createdAt: string} [];
})
 {
    const activityList = activities.map(activity =>

        <li 
            key={activity.id}
        >
            {activity.name}
        </li>
    );

    return (
        <ol>{activityList}</ol>
    );
}