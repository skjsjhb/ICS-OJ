"use server";

import type { TestInput } from "lc3xt/src/nya/context";
import { siteConfig } from "@/config/site";

export async function submitCode(input: TestInput, token: string) {
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