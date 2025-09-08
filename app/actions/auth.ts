"use server";

import { siteConfig } from "@/config/site";

export async function runLogin(uid: string, pwd: string): Promise<string> {
    const rp = await fetch(siteConfig.benchAPI + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uid, pwd })
    });

    if (!rp.ok) return "";

    return await rp.text();
}

export async function updatePwd(uid: string, pwd: string, token: string): Promise<boolean> {
    const rp = await fetch(siteConfig.benchAPI + "/auth/setpwd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ uid, pwd })
    });

    return rp.ok;
}