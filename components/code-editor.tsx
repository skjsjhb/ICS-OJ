"use client";

import { Switch } from "@heroui/switch";
import { Editor, loader, useMonaco } from "@monaco-editor/react";
import { ReactNode, useEffect, useState } from "react";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

const languages = [
    ["bin", "机器代码"],
    ["asm", "LC-3 汇编"]
];

export function useCodeEditor(): [string, string, ReactNode] {
    const [code, setCode] = useState("");
    const [languageId, setLanguageId] = useState<string>("asm");
    const [useAltEditor, setUseAltEditor] = useState<boolean>(false);
    const [editorUrlConfigured, setEditorUrlConfigured] = useState(false);

    useEffect(() => {
        (async () => {
            const url = await getPreferredEditorSource();

            loader.config({ paths: { vs: url } });
            setEditorUrlConfigured(true);
        })();
    }, []);

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
            {useAltEditor && <AltCodeEditor code={code} setCode={onCodeChange}/>}
            {!useAltEditor && editorUrlConfigured && (
                <CodeEditor code={code} setCode={onCodeChange}/>
            )}
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
    const editor = useMonaco();

    useEffect(() => {
        editor?.languages.register({ id: "lc3" });
        editor?.languages.setMonarchTokensProvider("lc3", LC3_SYNTAX as any);
    }, [editor]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <Editor
                height="100%"
                language="lc3"
                options={{
                    fontSize: 16,
                    fontFamily:
                        "'JetBrains Mono', Consolas, Monaco, 'Fira Code', 'Courier New', monospace",
                    automaticLayout: true
                }}
                theme="vs-dark"
                value={code}
                onChange={(s) => setCode(s || "")}
            />
        </div>
    );
}

const LC3_SYNTAX = {
    ignoreCase: true,
    keywords: [
        "add",
        "and",
        "br",
        "brn",
        "brz",
        "brp",
        "brnz",
        "brnp",
        "brzp",
        "brnzp",
        "jmp",
        "jsr",
        "jsrr",
        "ld",
        "ldi",
        "lea",
        "not",
        "ret",
        "rti",
        "st",
        "sti",
        "str",
        "trap",
        "getc",
        "out",
        "putc",
        "puts",
        "in",
        "putsp",
        "halt",
        ".blkw",
        ".end",
        ".external",
        ".fill",
        ".orig",
        ".stringz"
    ],
    tokenizer: {
        root: [
            [/;(.*)/, "comment"],
            [/\bR[0-7]\b/, "type.identifier"],
            [/[ |,]#-?[0-9]+/, "number"],
            [/\bx-?[A-F0-9]+\b/, "number"],
            [/'([^\\']|\\.)*'/, "string"],
            [/"([^\\"]|\\.)*"/, "string"],
            [/\S+/, { cases: { "@keywords": "keyword" } }]
        ]
    }
};

const editorSources = [
    {
        test: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.min.js",
        url: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs"
    },
    {
        test: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.min.js",
        url: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
    },
    {
        test: "https://cdn.staticfile.net/monaco-editor/0.52.2/min/vs/loader.min.js",
        url: "https://cdn.staticfile.net/monaco-editor/0.52.2/min/vs"
    }
];

export async function getPreferredEditorSource(): Promise<string> {
    const ac = new AbortController();

    return await Promise.race(
        editorSources.map(({ test, url }) => {
            return new Promise<string>((res) => {
                fetch(test, { signal: ac.signal }).then((r) => {
                    if (r.ok) {
                        console.log("Picked up URL: " + url);
                        ac.abort("Cancelled");
                        res(url);
                    }
                }).catch(() => {});
            });
        })
    );
}
