"use server";

import { siteConfig } from "@/config/site";
import { cookies } from "next/headers";

export async function runLogin(uid: string, pwd: string): Promise<boolean> {
    const rp = await fetch(siteConfig.benchAPI + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uid, pwd })
    });

    if (!rp.ok) return false;

    await setCookie(uid, await rp.text());
    return true;
}

export async function updatePwd(pwd: string): Promise<boolean> {
    const { uid, token } = await getCredentials();
    if (!token) return false;

    const rp = await fetch(siteConfig.benchAPI + "/auth/setpwd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ uid, pwd })
    });

    if (!rp.ok) return false;

    await setCookie(uid, await rp.text());
    return true;
}

export async function refreshToken(): Promise<boolean> {
    const { uid, token } = await getCredentials();
    if (!token) return false;

    const rp = await fetch(siteConfig.benchAPI + "/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ uid })
    });

    if (!rp.ok) return false;

    await setCookie(uid, await rp.text());
    return true;
}

async function getCredentials(): Promise<{ uid: string, token: string }> {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value || "";
    const token = cookieStore.get("token")?.value || "";
    return { uid, token };
}

async function setCookie(uid: string, token: string) {
    const cookieStore = await cookies();
    cookieStore.set("uid", uid, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    cookieStore.set("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
}