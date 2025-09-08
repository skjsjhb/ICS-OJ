"use client";

import { Select, SelectItem } from "@heroui/select";
import { labContents } from "@/components/labs";
import { PlayIcon } from "@primer/octicons-react";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { sendBenchRequest } from "@/components/bench";
import { CodeContext } from "@/components/code-context";
import { toast } from "react-toastify";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import Link from "next/link";

export function SubmitWidget() {
    const [labId, setLabId] = useState("hello");
    const [cookies] = useCookies(["uid"]);
    const { value: { code, lang } } = useContext(CodeContext);

    useEffect(() => {
        setLabId(localStorage.getItem("selected-lab") || "hello");
    }, []);

    const changeLab = (id: string) => {
        setLabId(id);
        localStorage.setItem("selected-lab", id);
    };

    const submitCode = async () => {
        try {
            const res = await sendBenchRequest(labId, lang, code, {});

            toast.success("提交成功！");
            location.pathname = "/r/" + res;
        } catch (e) {
            toast.error("提交失败，请再试一次。");
        }
    };

    const disableSubmit = !cookies.uid || code.trim().length == 0;

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
                    title="登录后才能提交评测。"
                    endContent={
                        <Button color="warning" variant="flat" as={Link} href="/login">
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