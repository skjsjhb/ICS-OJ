"use server";

import type { TestInput } from "lc3xt/src/nya/context";
import { siteConfig } from "@/config/site";
import { cookies } from "next/headers";

export async function submitCode(input: TestInput) {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value || "";
    const token = cookieStore.get("token")?.value || "";
    const authorization = (uid && token) ? token : "guest";

    input.uid = uid;

    let endpoint = "/submit";

    // TODO: Need a robust solution
    if (input.driver === "assembler") {
        endpoint = "/assembler-submit";
    }

    const res = await fetch(siteConfig.benchAPI + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        },
        body: JSON.stringify(input)
    });

    if (res.ok) {
        return await res.text();
    }

    return "";
}