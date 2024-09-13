import { Code } from "@nextui-org/code";
import clsx from "clsx";

import { fontMono } from "@/config/fonts";

export default function CodeBlock({ code }: { code: string }) {
  if (code.length === 0) {
    return <p className="font-bold text-default-400">（无内容）</p>;
  }

  return (
    <Code className="p-4 w-full">
      <div className="flex flex-col gap-2">
        {code.split("\n").map((line, i) => (
          <div key={i} className={clsx("text-wrap", fontMono.className)}>
            {line}
          </div>
        ))}
      </div>
    </Code>
  );
}
