import { BenchRequest } from "@/components/bench-types";

export async function sendBenchRequest(
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
      labId: lab,
      language: lang,
      source: code,
      env,
    } satisfies BenchRequest),
  });

  if (ret.status != 201) {
    throw `Failed to submit bench request: ${await ret.text()}`;
  }

  return await ret.text();
}
