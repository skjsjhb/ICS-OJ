"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { updatePwd } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function SetPwdPage() {
    const [formPwd, setFormPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const router = useRouter();

    const [cookies] = useCookies(["uid"]);

    if (!cookies.uid) return "";

    async function setPwd() {
        const ok = await updatePwd(formPwd);
        if (!ok) {
            toast.error("无法修改密码，请检查凭据。");
            return;
        }

        toast.success("已更新密码。");
        router.push("/login");
    }

    const allowSubmit = formPwd === confirmPwd && !!formPwd;

    return <Card className="w-1/3">
        <CardBody className="flex flex-col gap-4 p-8 items-center">
            <h1 className="font-bold text-2xl mb-4">更新密码</h1>
            <Input value={cookies.uid} isDisabled/>
            <Input type="password" placeholder="新密码" value={formPwd} onValueChange={setFormPwd}/>
            <Input type="password" placeholder="确认密码" value={confirmPwd} onValueChange={setConfirmPwd}/>
            <Button color="primary" onPress={setPwd} isDisabled={!allowSubmit} fullWidth>修改密码</Button>
        </CardBody>
    </Card>;
}