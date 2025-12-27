// nickname input
'use client';

import { useState } from "react";

export default function NicknameInput() {
    const [ nickname, setNickname ] = useState("");
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch('/api/lobby/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: nickname,
            }),
        });

        if (!res.ok) {
            //handle error
            const { error } = await res.json();
            setError(error)
            return;
        } 
        
        setSuccess(`Welcome ${nickname}!`);
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

            <button type="submit">Join</button>
        </form>
    );
}