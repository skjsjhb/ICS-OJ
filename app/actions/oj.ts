"use server";

import type { TestInput } from "lc3xt/src/nya/context";
import { siteConfig } from "@/config/site";
import { cookies } from "next/headers";

export async function submitCode(input: TestInput) {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value || "";
    const token = cookieStore.get("token")?.value || "";
    if (!uid || !token) return "";

    input.uid = uid;

    const res = await fetch(siteConfig.benchAPI + "/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(input)
    });

    if (res.ok) {
        return await res.text();
    }

    return "";
}