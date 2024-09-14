import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import { ClockIcon } from "@primer/octicons-react";

import { BenchResult } from "@/components/bench-types";
import CopyCode from "@/components/copy-code";
import BenchUnits from "@/components/bench-units";
import CodeBlock from "@/components/code-block";
import { RefreshButton } from "@/components/refresh-button";

export default async function RecordPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:7900/oj/record/${params.id}`);
  const pending = res.status === 204;

  if (pending) {
    return (
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
        <ClockIcon size={32} />
        <p className="text-lg font-bold">评测进行中，请稍等。</p>
        <RefreshButton />
      </div>
    );
  }

  const benchResult = (await res.json()) as BenchResult;
  const benchedTime = getBenchCompletedTime(benchResult);
  const passed =
    benchResult.units.length > 0 &&
    benchResult.units.every((u) => u.code === "AC");
  const totalCount = benchResult.units.length;
  const passedCount = benchResult.units.filter((u) => u.code === "AC").length;

  return (
    <div className="px-8 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <p className="text-3xl font-bold">提交记录 / {params.id}</p>
        <Chip color={passed ? "success" : "warning"} variant="bordered">
          {passed ? "通过 / Accepted" : "未通过 / Not Accepted"}
        </Chip>
      </div>

      {passed ? (
        <p className="text-xl font-bold text-green-300">恭喜！</p>
      ) : (
        <p className="text-xl font-bold text-yellow-300">祝下次好运！</p>
      )}

      <Divider />

      <p className=" text-foreground-500">
        提交于 {new Date(benchResult.time).toLocaleString()}
        <br />
        {benchedTime > 0 ? (
          <>评测完成于 {new Date(benchResult.time).toLocaleString()}</>
        ) : (
          <>评测失败</>
        )}
      </p>

      <div className="flex mt-2">
        {/* Left column */}
        <div className="flex flex-col basis-2/3 gap-4">
          <p className="text-2xl font-bold">评测总结</p>

          {benchResult.error ? (
            <p className="text-warning">{getErrorText(benchResult)}</p>
          ) : (
            <div>
              本次评测总计使用了 {totalCount} 个测试点，您的程序通过了&nbsp;
              {passedCount} 个。
              <br />
              <br />
              <div className="font-bold gap-4 text-warning">
                <FailedDescription benchResult={benchResult} code="WA" />
                <FailedDescription benchResult={benchResult} code="RE" />
                <FailedDescription benchResult={benchResult} code="TLE" />
                <FailedDescription benchResult={benchResult} code="SE" />
              </div>
            </div>
          )}

          <p className="text-2xl font-bold">测试点信息</p>

          <div className="w-10/12">
            <BenchUnits result={benchResult} />
          </div>

          <p className="text-2xl font-bold">评测参数</p>
          <div className="w-10/12">
            <CodeBlock
              code={Object.entries(benchResult.request.env)
                .map(([k, v]) => k + "=" + v)
                .join("\n")}
            />
          </div>

          <p className="font-bold text-2xl">测试环境</p>
          <div className="w-10/12">
            <CodeBlock code={benchResult.version} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col basis-1/3 gap-4">
          <p className="text-2xl font-bold">源代码</p>
          <CopyCode data={benchResult.request.source} />
          <CodeBlock code={benchResult.request.source} />
        </div>
      </div>
    </div>
  );
}

function FailedDescription({
  code,
  benchResult,
}: {
  code: string;
  benchResult: BenchResult;
}) {
  const count = benchResult.units.filter((u) => u.code === code).length;

  if (count === 0) return <></>;
  switch (code) {
    case "WA":
      return <>{count} 个测试点的答案不正确。</>;
    case "RE":
      return <>{count} 个测试点发生运行错误。</>;
    case "TLE":
      return <>{count} 个测试点运行超时。</>;
    case "SE":
      return <>{count} 个测试点发生内部错误。</>;
    default:
      return <></>;
  }
}

function getErrorText(b: BenchResult): string {
  if (b.error === "CE") return `未完成评测：汇编错误（${b.message}）`;
  else return "未完成评测：评测选项错误或缺失";
}

function getBenchCompletedTime(b: BenchResult) {
  let t = -1;

  for (const { time } of b.units) {
    if (time > t) t = time;
  }

  return t;
}
