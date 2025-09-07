"use server";

import { siteConfig } from "@/config/site";

export async function getRecord(id: string, token: string): Promise<string | null> {
    const res = await fetch(siteConfig.benchAPI + `/record/${id}`, {
        headers: {
            "Authorization": token
        }
    });

    if (!res.ok) return null;

    if (res.status === 202) return "PENDING";

    return await res.text();
}