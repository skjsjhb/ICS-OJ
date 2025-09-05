import { useEffect, useState } from "react";

export function useUid() {
    const pair = useState<string>("");
    const [uid, setUid] = pair;

    useEffect(() => {
        setUid(localStorage.getItem("uid") || "");
    }, []);

    useEffect(() => {
        if (!!uid) {
            localStorage.setItem("uid", uid);
        }
    }, [uid]);

    return pair;
}

export function clearUid() {
    console.log("Clearing UID");
    localStorage.removeItem("uid");

}

export function getToken(): string {
    return localStorage.getItem("token") || "";
}

export function setToken(s: string) {
    localStorage.setItem("token", s);
}