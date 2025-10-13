import { ClockIcon } from "@primer/octicons-react";
import { TestResult } from "lc3xt/src/nya/context";

import CopyCode from "@/components/copy-code";
import { TestResultDisplay } from "@/components/test-result-display";
import CodeBlock from "@/components/code-block";
import { RefreshButton } from "@/components/refresh-button";
import { labContents } from "@/components/labs";
import { ExceptionList } from "@/components/exception-list";
import React from "react";
import { cookies } from "next/headers";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";

export default async function RecordPage({ params: params0 }: { params: Promise<{ id: string }> }) {
    const params = await params0;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    const res = await fetch(siteConfig.benchAPI + `/record/${params.id}`, {
        headers: {
            "Authorization": token
        }
    });

    if (!res.ok) return notFound();

    if (res.status === 202) {
        return (
            <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
                <ClockIcon size={32}/>
                <p className="text-lg font-bold">评测进行中，请稍等。</p>
                <RefreshButton/>
            </div>
        );
    }

    const testResult = await res.json() as TestResult;

    const benchedTime = getCompletedTime(testResult);
    const passed = testResult.accepted;
    const totalCount = testResult.units.length;
    const passedCount = testResult.units.filter((u) => u.status === "AC").length;
    const isGuest = testResult.context.uid === "";

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

            {
                isGuest &&
                <div className="text-warning font-bold">
                    本次评测未记名，将在您离开后被销毁。
                </div>
            }

            <Divider/>

            <p className="text-default-500">
                {
                    labContents.find((it) => it.id == testResult.context.driver)
                        ?.displayName
                }
                <br/>
                <br/>
                提交时间：{new Date(testResult.time).toLocaleString()}
                <br/>
                {
                    benchedTime > 0 ? (
                        <>评测完成时间：{new Date(testResult.time).toLocaleString()}</>
                    ) : (
                        <>评测失败</>
                    )
                }
                <br/>
                {testResult.context.uid && ("提交者：" + testResult.context.uid)}
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
                        <TestResultDisplay result={testResult}/>
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

function FailedDescription({ code, benchResult }: { code: string; benchResult: TestResult; }) {
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
    else return "未完成评测：" + b.error;
}

function getCompletedTime(b: TestResult) {
    let t = -1;

    for (const { time } of b.units) {
        if (time > t) t = time;
    }

    return t;
}
