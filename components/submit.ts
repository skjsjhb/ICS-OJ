import { submitCode } from "@/app/actions/oj";
import { refreshToken } from "@/app/actions/auth";

export async function clientSubmitCode(
    lab: string,
    lang: string,
    code: string,
    asGuest: boolean
): Promise<string> {
    // TODO switch to enum check
    const lng = lang === "bin" ? "bin" : "asm";

    // TODO need a more robust solution
    if (!asGuest) {
        const lastRefreshed = parseInt(localStorage.getItem("lastRefreshTime") ?? "") || 0;
        if (Date.now() - lastRefreshed > 24 * 60 * 60 * 1000) {
            if (!await refreshToken()) {
                throw "Invalid token";
            }
        }
    }

    const rid = await submitCode({
        uid: "", // Will be loaded from cookies
        driver: lab,
        lang: lng,
        source: code
    });

    if (!rid) {
        throw "Failed to submit bench request";
    }

    return rid;
}
