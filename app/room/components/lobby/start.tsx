// start button (client-side component)
'use client';
import { useState } from "react";
import useUserID from "../userid";
import { useRouter } from "next/navigation";

export default function StartButton({
    hostUserId,
}: {
    hostUserId: string | null;
}) {
    const userID = useUserID();
    const canStart = userID === hostUserId;
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    
    async function handleClick (){
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
            const { error } = await res.json();
            setError(error);
            return;
        }

        setError(null);
        router.refresh();
    }

    return (
        <div>
            <button onClick={handleClick} disabled={!canStart}>
                Start the Process!
            </button>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

        </div>
    );
} 