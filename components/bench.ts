import { TestInput } from "lc3xt/src/nya/context";

export async function sendBenchRequest(
    uid: string,
    token: string,
    lab: string,
    lang: string,
    code: string,
    env: Record<string, string>
): Promise<string> {
    // TODO switch to enum check
    const lng = lang === "bin" ? "bin" : "asm";

    const ret = await fetch("/api/oj", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            uid,
            driver: lab,
            lang: lng,
            source: code,
            env
        } satisfies TestInput)
    });

    if (ret.status != 200) {
        throw `Failed to submit bench request: ${await ret.text()}`;
    }

    return await ret.text();
}
