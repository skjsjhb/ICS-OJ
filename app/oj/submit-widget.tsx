"use client";

import { Select, SelectItem } from "@heroui/select";
import { labContents } from "@/components/labs";
import { PlayIcon } from "@primer/octicons-react";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { clientSubmitCode } from "@/components/submit";
import { CodeContext } from "@/components/code-context";
import { toast } from "react-toastify";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import Link from "next/link";
import { encode } from "uint8-to-base64";

export function SubmitWidget() {
    const [labId, setLabId] = useState("hello");
    const [cookies] = useCookies(["uid"]);
    const { value: { code, lang, file } } = useContext(CodeContext);

    useEffect(() => {
        setLabId(localStorage.getItem("selected-lab") || "hello");
    }, []);

    const changeLab = (id: string) => {
        setLabId(id);
        localStorage.setItem("selected-lab", id);
    };

    const submitCode = async () => {
        try {
            let content: string;

            if (lang === "file" && file) {
                const { promise, resolve, reject } = Promise.withResolvers<string>();
                const fr = new FileReader();
                fr.onerror = (e) => reject(e);
                fr.onload = (d) => {
                    const buf = d.target?.result as ArrayBuffer;
                    resolve(encode(new Uint8Array(buf)));
                };
                fr.readAsArrayBuffer(file);
                content = await promise;
            } else {
                content = code;
            }
            const res = await clientSubmitCode(labId, lang, content, !cookies.uid);

            toast.success("提交成功！");
            location.pathname = "/r/" + res;
        } catch (e) {
            toast.error("提交失败，请再试一次。");
        }
    };

    const disableSubmit = code.trim().length == 0 && !file;

    return <div className="flex flex-col gap-6 w-full">
        <Select
            disallowEmptySelection
            label="选取实验"
            selectedKeys={[labId]}
            size="sm"
            onChange={(e) => changeLab(e.target.value)}
        >
            {labContents.map((lab) => (
                <SelectItem key={lab.id}>{lab.displayName}</SelectItem>
            ))}
        </Select>

        {
            !cookies.uid &&
            <div className="w-full">
                <Alert
                    color="warning"
                    title="您尚未登录，评测记录将不记名。"
                    endContent={
                        <Button color="warning" variant="flat" as={Link} href="/auth/login">
                            前往登录
                        </Button>
                    }
                />
            </div>
        }

        <Button
            fullWidth
            color="primary"
            isDisabled={disableSubmit}
            onPress={submitCode}
        >
            <div className="flex items-center gap-2">
                <PlayIcon/>
                提交代码
            </div>
        </Button>
    </div>;
}