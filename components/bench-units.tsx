"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import clsx from "clsx";

import { BenchResult, BenchResultCode } from "@/components/bench-types";
import CodeBlock from "@/components/code-block";

export default function BenchUnits({ result }: { result: BenchResult }) {
  if (result.units.length === 0)
    return <p className="font-bold text-default-400">（无内容）</p>;

  return (
    <Accordion isCompact variant="bordered">
      {result.units.map((u, i) => (
        <AccordionItem
          key={i}
          textValue={i.toString()}
          title={
            <div className="flex gap-4 items-center">
              <p className="font-bold text-xl">#{i}</p>
              <Subtitle code={u.code} />
            </div>
          }
        >
          <div className="flex flex-col gap-4 px-2 py-4">
            <p className="font-bold">{localizedCodeDescription[u.code]}</p>

            <p className="font-bold text-lg">输入</p>
            <CodeBlock code={u.io.input} />

            <p className="font-bold text-lg">预期输出</p>
            <CodeBlock code={u.io.expected} />

            <p className="font-bold text-lg">实际输出</p>
            <CodeBlock code={u.io.received} />

            <p className="font-bold text-lg">测试点消息</p>
            <CodeBlock code={u.message} />

            <p className="font-bold text-lg">统计信息</p>
            <div className="text-sm flex flex-col gap-1">
              <p>执行指令数：{u.stat.instCount}</p>
              <p>读取内存：{u.stat.memRead}</p>
              <p>写入内存：{u.stat.memWrite}</p>
            </div>

            <p className="font-bold text-lg">测试环境</p>
            <CodeBlock code={u.version} />
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const localizedCode = {
  AC: "通过 / Accepted",
  WA: "答案错误 / Wrong Answer",
  TLE: "运行超时 / Time Limit Exceeded",
  RE: "运行错误 / Runtime Error",
  SE: "系统错误 / System Error",
} as const;

const localizedCodeDescription = {
  AC: "本测试点的结果与预期相符。",
  WA: "本测试点答案不正确，请对比你的输出和预期的输出，并检查算法。",
  TLE: "本测试点运行超时，请检查程序中是否有死循环，或考虑优化算法。",
  RE: "本测试点检测到运行错误，请参照输出消息修正你的程序。",
  SE: "本测试点在测试过程中发生了故障。",
} as const;

function Subtitle({ code }: { code: BenchResultCode }) {
  return (
    <p
      className={clsx("font-bold text-sm", {
        "text-green-300": code === "AC",
        "text-red-300": code === "WA",
        "text-yellow-300": code === "RE",
        "text-fuchsia-300": code === "TLE",
        "text-gray-300": code === "SE",
      })}
    >
      {localizedCode[code]}
    </p>
  );
}
