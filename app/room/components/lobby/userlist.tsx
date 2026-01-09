'use client';

// render user list (empty at first) & host label
export default function UserList({
    users,
    hostUserId,
}: {
    users: {nickname: string; userId: string; joinedAt: string} [];
    hostUserId: string | null;
})
 {
    const userList = users.map(user =>

        <li 
            key={user.userId}
            style= {{
                // if user is the host, denote it by coloring his name red
                color: user.userId === hostUserId ? 'red' : 'white'
            }}
        >
            {user.nickname}
        </li>
    );

    return (
        <ol>{userList}</ol>
    );
}