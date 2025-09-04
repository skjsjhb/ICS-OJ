import clsx from "clsx";
import { AssembleExceptionSummary } from "lc3xt/src/loli/exceptions";
import { RuntimeExceptionSummary } from "lc3xt/src/sugar/exceptions";

function toHex(a: number) {
    return "x" + a.toString(16).padStart(4, "0");
}

export function ExceptionList({ ex }: { ex: AssembleExceptionSummary[] | RuntimeExceptionSummary[]; }) {
    return (
        <div className="flex flex-col gap-2">
            {ex.map((it, i) => (
                <p
                    key={i}
                    className={clsx("font-bold text-sm", {
                        "text-danger": it.level === "error",
                        "text-warning": it.level === "warn"
                    })}
                >
                    {"lineNo" in it && `第 ${it.lineNo} 行：`}
                    {"addr" in it && `地址 ${toHex(it.addr)}：`}
                    {it.message}
                </p>
            ))}
        </div>
    );
}
