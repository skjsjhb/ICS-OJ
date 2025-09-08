"use client";

import { Switch } from "@heroui/switch";
import { useContext, useState } from "react";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/theme-one_dark";
import "./lc3";
import { CodeContext } from "@/components/code-context";

const languages = [
    ["bin", "机器代码"],
    ["asm", "LC-3 汇编"]
];

export function CodeEditor() {
    const [useAltEditor, setUseAltEditor] = useState<boolean>(false);
    const { value: { code, lang }, setValue } = useContext(CodeContext);

    function onCodeChange(code: string) {
        setValue({ code, lang });
    }

    function onLangChange(lang: string) {
        setValue({ code, lang });
    }

    return <div className="flex flex-col gap-4 items-center w-full h-full">
        <Select
            disallowEmptySelection
            label="语言"
            selectedKeys={[lang]}
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
                <FancyCodeEditor code={code} setCode={onCodeChange} highlight={lang === "asm"}/>
        }
        <div>
            <Switch onChange={(e) => setUseAltEditor(e.target.checked)}>
                使用纯文本编辑器
            </Switch>
        </div>
    </div>;
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

function FancyCodeEditor({ code, setCode, highlight }: {
    code: string;
    setCode: (c: string) => void;
    highlight: boolean
}) {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <AceEditor
                mode={highlight ? "lc3" : "text"}
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
