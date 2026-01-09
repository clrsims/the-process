// nickname input (client-side component)
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserID from "../userid";

export default function NicknameInput() {
    const [ nickname, setNickname ] = useState("");
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);
    const router = useRouter();

    const userID = useUserID();
   

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // HARD INVARIANT: never send a request without a userID
        if (!userID) {
            setError("Initializing your session. Please try again in a moment.");
            return;
        }

        e.preventDefault();
        const joinedAt = new Date().toISOString();

        const res = await fetch('/api/lobby/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: nickname,
                userID: userID,
                joinedAt: joinedAt,
            }),
        });

        if (!res.ok) {
            //handle error
            const { error } = await res.json();
            setError(error);
            setSuccess(null);
            setNickname("");
            return;
        } 
        
        setSuccess(`Welcome ${nickname}!`);
        setNickname("");
        setError(null);
        
        // Refresh the server component to show updated user list
        router.refresh();
    }

    return (
        <form onSubmit = {handleSubmit}>
            <input
                type = "text"
                value = {nickname}
                onChange = {(e) => setNickname(e.target.value)}
            />

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

            {success && (
                <p style={{ color: 'green' }}>
                    {success}
                </p>
            )}

            <button type="submit" disabled={!userID}>Join</button>
        </form>
    );
}