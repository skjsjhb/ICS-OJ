import { useEffect, useState } from "react";
import { getFingerprint, setOption } from "@thumbmarkjs/thumbmarkjs";

export function useSession(): string {
    const [session, setSession] = useState("");

    useEffect(() => {
        const s = localStorage.getItem("session");

        if (s) {
            setSession(s);
        } else {
            setOption("exclude", ["permissions", "plugins"]);
            getFingerprint().then((f) => setSession(f as string));
        }
    }, []);

    return session;
}
