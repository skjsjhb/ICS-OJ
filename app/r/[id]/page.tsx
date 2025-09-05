"use client";

import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import { ClockIcon } from "@primer/octicons-react";
import { TestResult } from "lc3xt/src/nya/context";

import CopyCode from "@/components/copy-code";
import BenchUnits from "@/components/bench-units";
import CodeBlock from "@/components/code-block";
import { RefreshButton } from "@/components/refresh-button";
import { labContents } from "@/components/labs";
import { ExceptionList } from "@/components/exception-list";
import { getRecord } from "@/app/lib/record";
import { getToken } from "@/components/user";
import React, { useEffect, useState } from "react";

export default function RecordPage({ params: params0 }: { params: React.Usable<{ id: string }> }) {
    // const latestVersion = await (
    //     await fetch(siteConfig.benchAPI + "/version", { cache: "no-cache" })
    // ).text();
    console.log("Begin render");
    const params = React.use(params0);

    const [record, setRecord] = useState<string | null>(null);

    useEffect(() => {
        console.log("Running in effect");
        console.log("Page ID: " + params.id);
        getRecord(params.id, getToken()).then(setRecord);
    }, [params.id]);

    const res = record;

    if (res === null) {
        // return notFound();
        return <div></div>;
    }

    const pending = res === "PENDING";

    if (pending) {
        return (
            <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
                <ClockIcon size={32}/>
                <p className="text-lg font-bold">评测进行中，请稍等。</p>
                <RefreshButton/>
            </div>
        );
    }

    const testResult = JSON.parse(res) as TestResult;

    const benchedTime = getCompletedTime(testResult);
    const passed =
        testResult.units.length > 0 &&
        testResult.units.every((u) => u.status === "AC");
    const totalCount = testResult.units.length;
    const passedCount = testResult.units.filter((u) => u.status === "AC").length;

    return (
        <div className="mx-auto w-5/6 py-8 px-8 flex flex-col gap-4">
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

            <Divider/>

            <p className="text-default-500">
                {
                    labContents.find((it) => it.id == testResult.context.driver)
                        ?.displayName
                }
                <br/>
                <br/>
                提交于 {new Date(testResult.time).toLocaleString()}
                <br/>
                {benchedTime > 0 ? (
                    <>评测完成于 {new Date(testResult.time).toLocaleString()}</>
                ) : (
                    <>评测失败</>
                )}
                <br/>
                提交者：{testResult.context.uid}
            </p>

            <Divider className="my-2"/>

            <div className="flex mt-2">
                {/* Left column */}
                <div className="flex flex-col basis-2/3 gap-6">
                    <p className="text-2xl font-bold">评测总结</p>

                    {testResult.error ? (
                        <p className="text-warning">{getErrorText(testResult)}</p>
                    ) : (
                        <div>
                            本次评测总计使用了 {totalCount} 个测试点，您的程序通过了&nbsp;
                            {passedCount} 个。
                            <div className="font-bold gap-4 text-warning pt-4">
                                <FailedDescription benchResult={testResult} code="WA"/>
                                <FailedDescription benchResult={testResult} code="RE"/>
                                <FailedDescription benchResult={testResult} code="TLE"/>
                                <FailedDescription benchResult={testResult} code="SE"/>
                            </div>
                        </div>
                    )}

                    {testResult.assembleExceptions.length > 0 && (
                        <>
                            <p className="text-2xl font-bold">汇编消息</p>
                            <ExceptionList ex={testResult.assembleExceptions}/>
                        </>
                    )}

                    <p className="text-2xl font-bold">测试点信息</p>

                    <div className="w-10/12">
                        <BenchUnits result={testResult}/>
                    </div>

                    <p className="text-2xl font-bold">评测参数</p>
                    <div className="w-10/12">
                        <CodeBlock
                            code={Object.entries(testResult.context.env)
                                .map(([k, v]) => k + "=" + v)
                                .join("\n")}
                        />
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col basis-1/3 gap-4">
                    <p className="text-2xl font-bold">源代码</p>
                    <CopyCode data={testResult.context.source}/>
                    <CodeBlock code={testResult.context.source}/>
                </div>
            </div>
        </div>
    );
}

function FailedDescription({
                               code,
                               benchResult
                           }: {
    code: string;
    benchResult: TestResult;
}) {
    const count = benchResult.units.filter((u) => u.status === code).length;

    if (count === 0) return <></>;
    switch (code) {
        case "WA":
            return <>{count} 个测试点的答案不正确。</>;
        case "RE":
            return <>{count} 个测试点发生运行错误。</>;
        case "TLE":
            return <>{count} 个测试点运行超时。</>;
        case "SE":
            return <>{count} 个测试点发生参数错误。</>;
        default:
            return <></>;
    }
}

function getErrorText(b: TestResult): string {
    if (b.error === "CE")
        return `未完成评测：汇编错误`; // TODO list compile errors
    else return "未完成评测：评测选项错误或缺失";
}

function getCompletedTime(b: TestResult) {
    let t = -1;

    for (const { time } of b.units) {
        if (time > t) t = time;
    }

    return t;
}
