"use client";

import { Switch } from "@heroui/switch";
import type { DragEvent } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/theme-one_dark";
import "./lc3";
import { CodeContext } from "@/components/code-context";
import { i18nInit } from "lc3xt/src/i18n/i18n";
import { loli } from "lc3xt/src/loli/api";
import { AssembleExceptionSummary } from "lc3xt/src/loli/exceptions";

const languages = [
    ["bin", "机器代码"],
    ["asm", "LC-3 汇编"]
];

let i18nInitialized = false;

function buildCode(src: string): AssembleExceptionSummary[] {
    if (!i18nInitialized) {
        i18nInitialized = true;
        void i18nInit("zh-CN");
    }

    return loli.build(src).exceptions;
}

export function CodeEditor() {
    const [useAltEditor, setUseAltEditor] = useState<boolean>(false);
    const [inspections, setInspections] = useState<AssembleExceptionSummary[]>([]);
    const { value: { code, lang }, setValue } = useContext(CodeContext);
    const dirtyTimer = useRef<any>(null);

    useEffect(() => {
        scheduleBuild(code);
    }, [code]);

    function scheduleBuild(code: string) {
        if (!useAltEditor) {
            // Debounce
            clearTimeout(dirtyTimer.current);
            setTimeout(() => {
                const ins = buildCode(code);
                setInspections(ins);
            }, 200);
        }
    }

    function onCodeChange(code: string) {
        setValue({ code, lang });
    }

    function onLangChange(lang: string) {
        setValue({ code, lang });
    }

    async function onFileDrop(ev: DragEvent<HTMLDivElement>) {
        console.log("Dropped event");
        ev.preventDefault();
        const files = ev.dataTransfer?.files;
        console.log("Files: " + files?.length);
        if (files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const bytes = new Uint8Array(e.target?.result as ArrayBuffer);
                let binary = "";
                for (let i = 0; i < bytes.byteLength; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                const txt = window.btoa(binary);
                setValue({ code: txt, lang });
            };
            reader.readAsArrayBuffer(files[0]);
        }
    }

    return <div className="flex flex-col gap-4 items-center w-full h-full" onDrop={onFileDrop}
                onDragOver={(e) => {
                    console.log("Drag over!");
                    e.preventDefault();
                }}>
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
                <FancyCodeEditor
                    code={code}
                    setCode={onCodeChange}
                    highlight={lang === "asm"}
                    inspections={inspections}
                />
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

function FancyCodeEditor({ code, setCode, highlight, inspections }: {
    code: string;
    setCode: (c: string) => void;
    highlight: boolean,
    inspections: AssembleExceptionSummary[]
}) {
    const editorRef = useRef<AceEditor | null>(null);

    useEffect(() => {
        const annotations = inspections.map(ex => {
            if (!ex.lineNo || !ex.message || !ex.message) return null;
            return {
                row: ex.lineNo - 1,
                text: ex.message,
                type: ex.level === "error" ? "error" : "warning"
            };
        }).filter(it => !!it);

        const editor = editorRef.current?.editor;
        if (!editor) return;

        editor.getSession().clearAnnotations();
        setTimeout(() => {
            editor.getSession().setAnnotations(annotations as any);
        });
    }, [inspections]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <AceEditor
                mode={highlight ? "lc3" : "text"}
                style={{
                    fontFamily: "\"JetBrains Mono Semibold\", Consolas, Menlo, Monaco, \"Courier New\", monospace"
                }}
                ref={editorRef}
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
