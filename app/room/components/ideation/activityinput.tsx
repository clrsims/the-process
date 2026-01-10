'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserID from "../userid";

export default function ActivityInput() {
    const [ activity, setActivity ] = useState("");
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);
    const router = useRouter();

    const userID = useUserID();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch('/api/ideation/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activity: activity,
                userID: userID,
            }),
        });

        if (!res.ok) { // error handling & display
            const { error } = await res.json();
            setError(error);
            setSuccess(null);
            setActivity("");
            return;
        }

        setSuccess(` \'${activity}\' submitted!`);
        setActivity("");
        setError(null);

        // refresh server component to show updated activity list
        router.refresh();
    }

    return (
        <form onSubmit = {handleSubmit}>
            <input
                type = "text"
                value = {activity}
                onChange = {(e) => setActivity(e.target.value)}
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

            <button type="submit">Submit</button>
        </form>
    );
}