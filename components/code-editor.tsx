import { Editor, useMonaco } from "@monaco-editor/react";
import { ReactNode, useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/select";

const languages = [
  ["bin", "机器代码"],
  ["asm", "LC-3 汇编"],
];

export function useCodeEditor(): [string, string, ReactNode] {
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState<string>("asm");

  useEffect(() => {
    setCode(localStorage.getItem("editor.code") || "");
    setLanguageId(localStorage.getItem("editor.lang") || "asm");
  }, []);

  const monaco = useMonaco();

  useEffect(() => {
    monaco?.languages.register({ id: "lc3" });
    monaco?.languages.setMonarchTokensProvider("lc3", LC3_SYNTAX as any);
  }, [monaco]);

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
      <CodeEditor code={code} setCode={onCodeChange} />
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
  tokenizer: {
    root: [
      [
        /\b(?:add|and|br(n?z?p?)?|jmp|jsr|jsrr|ld|ldi|ldr|lea|not|ret|rti|st|sti|str|trap|getc|out|putc|puts|in|putsp|halt)\b/,
        "keyword",
      ],
      [/;(.*)/, "comment"],
      [/\bR[0-7]\b/, "type.identifier"],
      [/[ |,]#-?[0-9]+/, "number"],
      [/\bx-?[A-F0-9]+\b/, "number"],
      [/'([^\\']|\\.)*'/, "string"],
      [/"([^\\"]|\\.)*"/, "string"],
      [/(\.blkw|\.end|\.external|\.fill|\.orig|\.stringz)\b/, "keyword"],
    ],
  },
};
