import { siteConfig } from "@/config/site";

export interface BenchPayload {
  lab: string;
  source: string;
  properties: Record<string, string>;
}

export type BenchResult =
  | "AC"
  | "WA"
  | "CE"
  | "EE"
  | "RE"
  | "TLE"
  | "EOF"
  | "SE";

export async function sendBenchRequest(
  lab: string,
  code: string,
  env: Record<string, string>,
): Promise<BenchResult[]> {
  const ret = await fetch(siteConfig.benchAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lab: lab, source: code, properties: env }),
  });

  if (ret.status != 200) {
    return [];
  }

  return (await ret.json()) as BenchResult[];
}
