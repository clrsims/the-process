// nickname input (client-side component)
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NicknameInput() {
    const [ nickname, setNickname ] = useState("");
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);
    const [ userID, setUserID ] = useState<string | null>(null);
    const router = useRouter();
   
    /* LOCAL STORAGE USER ID LOGIC */

    // We use useEffect because accessing or mutating localStorage is a side effect.
    // React component render functions must be pure, especially because they may
    // run on the server and during hydration. useEffect ensures this logic only
    // runs in the browser after the component mounts.

    useEffect(() => {
        // check if browser has a userID
        let id = localStorage.getItem('userID');

        // if this browser doesn't have a userID, generate one
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem('userID', id);
        }

        setUserID(id);
    }, []);

    async function handleSubmit(e: React.FormEvent) {

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