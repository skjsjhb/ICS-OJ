"use client";

import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface CodeContextContent {
    code: string;
    lang: string;
}

interface CodeContextValue {
    value: CodeContextContent;
    setValue: (v: CodeContextContent) => void;
}

export const CodeContext = createContext<CodeContextValue>({
    value: { code: "", lang: "asm" },
    setValue: () => {}
});

export function CodeContextProvider({ children }: PropsWithChildren) {
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("asm");

    useEffect(() => {
        setCode(localStorage.getItem("editor.code") || "");
        setLang(localStorage.getItem("editor.lang") || "asm");
    }, []);

    function update(v: CodeContextContent) {
        setCode(v.code);
        setLang(v.lang);
        localStorage.setItem("editor.code", v.code);
        localStorage.setItem("editor.lang", v.lang);
    }

    return <CodeContext.Provider value={{ value: { code, lang }, setValue: update }}>
        {children}
    </CodeContext.Provider>;
}