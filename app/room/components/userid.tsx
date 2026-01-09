/* LOCAL STORAGE USER ID LOGIC */

    // We use useEffect because accessing or mutating localStorage is a side effect.
    // React component render functions must be pure, especially because they may
    // run on the server and during hydration. useEffect ensures this logic only
    // runs in the browser after the component mounts.
    
"use client";
import { useEffect, useState } from "react";

export default function useUserID() {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem("userID");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("userID", id);
    }
    setUserID(id);
  }, []);

  return userID;
}