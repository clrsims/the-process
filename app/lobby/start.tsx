// start button (client-side component)
'use client';
import { useEffect, useState } from "react";

export default function StartButton() {
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);
    const [ userID, setUserID ] = useState<string | null>(null);

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
            //handle error
            const { error } = await res.json();
            setError(error);
            setSuccess(null);
            return;
        }

        setSuccess('Starting!');
        setError(null);
    }

    return (
        <div>
            <button onClick={handleClick}>
                Start the Process!
            </button>

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

        </div>
    );
} 