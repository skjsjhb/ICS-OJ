import { Code } from "@nextui-org/code";
import clsx from "clsx";

import { fontMono, fontSans } from "@/config/fonts";

export default function CodeBlock({ code, frequency }: { code: string, frequency?: Record<number, number> }) {
    if (code.length === 0) {
        return <p className="font-bold text-default-400">（无内容）</p>;
    }

    let lines = code.split("\n");

    if (lines.length == 0) {
        lines = [""];
    } else if (lines[lines.length - 1] == "") {
        lines.pop();
    }

    const length = (lines.length + 1).toString().length;

    return (
        <Code className="p-4 w-full">
            <div className="flex flex-col gap-2">
                {lines.map((line, i) => {
                    const freq = frequency?.[i + 1] ?? 0;
                    return <div
                        key={i}
                        className={clsx(
                            "text-wrap flex gap-4",
                            fontMono.variable,
                            fontSans.variable
                        )}
                        style={{ fontFamily: `var(--font-mono), var(--font-sans)` }}
                    >
                        <pre className="text-default-400">
                            {(i + 1).toString().padStart(length, " ")}
                        </pre>
                        <pre className="text-wrap break-all">{line.trimEnd()}</pre>
                        {
                            freq > 0 &&
                            <pre className="text-wrap break-all text-warning-400">({freq})</pre>
                        }
                    </div>;
                })}
            </div>
        </Code>
    );
}
