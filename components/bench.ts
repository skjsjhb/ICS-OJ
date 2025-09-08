import { submitCode } from "@/app/actions/oj";
import { refreshToken } from "@/app/actions/auth";

export async function sendBenchRequest(
    lab: string,
    lang: string,
    code: string,
    env: Record<string, string>
): Promise<string> {
    // TODO switch to enum check
    const lng = lang === "bin" ? "bin" : "asm";

    // TODO need a more robust solution
    const lastRefreshed = parseInt(localStorage.getItem("lastRefreshTime") ?? "") || 0;
    if (Date.now() - lastRefreshed > 24 * 60 * 60 * 1000) {
        if (!await refreshToken()) {
            throw "Invalid token";
        }
    }

    const rid = await submitCode({
        uid: "", // Will be loaded from cookies
        driver: lab,
        lang: lng,
        source: code,
        env
    });

    if (!rid) {
        throw "Failed to submit bench request";
    }

    return rid;
}
