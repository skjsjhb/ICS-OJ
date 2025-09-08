"use client";

import { Switch } from "@heroui/switch";
import { ReactNode, useEffect, useState } from "react";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/theme-one_dark";
import "./lc3";

const languages = [
    ["bin", "机器代码"],
    ["asm", "LC-3 汇编"]
];

export function useCodeEditor(): [string, string, ReactNode] {
    const [code, setCode] = useState("");
    const [languageId, setLanguageId] = useState<string>("asm");
    const [useAltEditor, setUseAltEditor] = useState<boolean>(false);

    useEffect(() => {
        setCode(localStorage.getItem("editor.code") || "");
        setLanguageId(localStorage.getItem("editor.lang") || "asm");
    }, []);

    const onCodeChange = (c: string) => {
        setCode(c);
        localStorage.setItem("editor.code", c);
    };

    const onLangChange = (c: string) => {
        setLanguageId(c);
        localStorage.setItem("editor.lang", c);
    };

    const node = (
        <div className="flex flex-col gap-4 items-center w-full h-full">
            <Select
                disallowEmptySelection
                label="语言"
                selectedKeys={[languageId]}
                size="sm"
                onChange={(e) => onLangChange(e.target.value)}
            >
                {languages.map(([id, displayName]) => (
                    <SelectItem key={id}>{displayName}</SelectItem>
                ))}
            </Select>
            {
                useAltEditor ?
                    <AltCodeEditor code={code} setCode={onCodeChange}/> :
                    <CodeEditor code={code} setCode={onCodeChange}/>
            }
            <div>
                <Switch onChange={(e) => setUseAltEditor(e.target.checked)}>
                    使用纯文本编辑器
                </Switch>
            </div>
        </div>
    );

    return [code, languageId, node];
}

function AltCodeEditor({ code, setCode }: {
    code: string;
    setCode: (c: string) => void;
}) {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <Textarea
                className="font-mono w-full h-full"
                size="lg"
                classNames={{ input: "p-2" }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </div>
    );
}

function CodeEditor({ code, setCode }: { code: string; setCode: (c: string) => void; }) {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <AceEditor
                mode="lc3"
                style={{
                    fontFamily: "\"JetBrains Mono Semibold\", Consolas, Menlo, Monaco, \"Courier New\", monospace"
                }}
                theme="one_dark"
                width="100%"
                height="100%"
                fontSize="1rem"
                value={code}
                onChange={(s) => setCode(s || "")}
                name="CODE_EDITOR"
                showPrintMargin={false}
                scrollMargin={[12, 12]}
            />
        </div>
    );
}
