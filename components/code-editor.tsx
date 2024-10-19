import { Editor, useMonaco, loader } from "@monaco-editor/react";
import { ReactNode, useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/select";

const languages = [
  ["bin", "机器代码"],
  ["asm", "LC-3 汇编"],
];

export function useCodeEditor(): [string, string, ReactNode] {
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState<string>("asm");
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
      {editorUrlConfigured && <CodeEditor code={code} setCode={onCodeChange} />}
    </div>
  );

  return [code, languageId, node];
}

function CodeEditor({
  code,
  setCode,
}: {
  code: string;
  setCode: (c: string) => void;
}) {
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
    ".stringz",
  ],
  tokenizer: {
    root: [
      [/;(.*)/, "comment"],
      [/\bR[0-7]\b/, "type.identifier"],
      [/[ |,]#-?[0-9]+/, "number"],
      [/\bx-?[A-F0-9]+\b/, "number"],
      [/'([^\\']|\\.)*'/, "string"],
      [/"([^\\"]|\\.)*"/, "string"],
      [/\S+/, { cases: { "@keywords": "keyword" } }],
    ],
  },
};

const editorSources = [
  {
    test: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.46.0/min/vs/loader.min.js",
    url: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.46.0/min/vs",
  },
  {
    test: "https://unpkg.com/browse/monaco-editor@0.46.0/min/vs/loader.js",
    url: "https://unpkg.com/browse/monaco-editor@0.46.0/min/vs",
  },
  {
    test: "https://cdn.jsdelivr.net/npm/monaco-editor@0.46.0/min/vs/loader.min.js",
    url: "https://cdn.jsdelivr.net/npm/monaco-editor@0.46.0/min/vs",
  },
  {
    test: "https://cdn.staticfile.net/monaco-editor/0.46.0/min/vs/loader.min.js",
    url: "https://cdn.staticfile.net/monaco-editor/0.46.0/min/vs",
  },
];

export async function getPreferredEditorSource(): Promise<string> {
  return await Promise.any(
    editorSources.map(async ({ test, url }) => {
      const res = await fetch(test);

      if (res.ok) {
        await res.text();

        return url;
      }
      throw `Unable to access ${test}`;
    }),
  );
}
