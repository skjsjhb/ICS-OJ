import { TestContext } from "@/types/nya";

export async function sendBenchRequest(
  session: string,
  lab: string,
  lang: string,
  code: string,
  env: Record<string, string>,
): Promise<string> {
  const ret = await fetch("/api/oj", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session,
      driver: lab,
      lang,
      source: code,
      env,
    } satisfies TestContext),
  });

  if (ret.status != 200) {
    throw `Failed to submit bench request: ${await ret.text()}`;
  }

  return await ret.text();
}
