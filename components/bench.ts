import { submitCode } from "@/app/lib/oj";

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

    const rid = await submitCode({
        uid,
        driver: lab,
        lang: lng,
        source: code,
        env
    }, token);

    if (!rid) {
        throw `Failed to submit bench request`;
    }

    return rid;
}
