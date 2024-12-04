import { NextRequest } from "next/server";

import { siteConfig } from "@/config/site";

export async function POST(req: NextRequest) {
  return await fetch(siteConfig.benchAPI + "/commit-assembler-test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: await req.arrayBuffer(),
  });
}

export async function GET(_: NextRequest) {
  return await fetch(siteConfig.benchAPI + "/acquire-assembler-test", {
    cache: "no-cache",
  });
}
