import { CodeIcon, ListOrderedIcon } from "@primer/octicons-react";
import { CodeContextProvider } from "@/components/code-context";
import { SubmitWidget } from "@/app/oj/submit-widget";
import { CodeEditor } from "@/app/oj/code-editor";

export default function OJPage() {
    return (
        <CodeContextProvider>
            <div className="flex w-full h-full px-12 py-12 my-auto">
                <div className="w-2/3 h-full flex flex-col gap-4 items-center px-6">
                    <div className="flex gap-2 text-xl font-bold items-center">
                        <CodeIcon/>
                        代码编辑
                    </div>
                    <div className="w-full h-full min-h-0">
                        <CodeEditor/>
                    </div>
                </div>

                <div className="w-1/3 flex flex-col gap-4 items-center px-6">
                    <div className="flex gap-2 text-xl font-bold items-center">
                        <ListOrderedIcon/>
                        评测选项
                    </div>

                    <SubmitWidget/>
                </div>
            </div>
        </CodeContextProvider>
    );
}
