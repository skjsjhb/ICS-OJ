import { Code } from "@nextui-org/code";
import clsx from "clsx";

import { fontMono, fontSans } from "@/config/fonts";

export default function CodeBlock({ code }: { code: string }) {
  if (code.length === 0) {
    return <p className="font-bold text-default-400">（无内容）</p>;
  }

  let lines = code.split("\n");

  if (lines.length == 0) {
    lines = [""];
  } else if (lines[lines.length - 1] == "") {
    lines.pop();
  }

  return (
    <Code className="p-4 w-full">
      <div className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className={clsx("text-wrap", fontMono.variable, fontSans.variable)}
            style={{ fontFamily: `var(--font-mono), var(--font-sans)` }}
          >
            {line}
          </div>
        ))}
      </div>
    </Code>
  );
}
