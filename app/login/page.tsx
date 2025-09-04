"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { runLogin } from "@/app/lib/auth";
import { toast } from "react-toastify";
import { setToken, useUid } from "@/components/user";

export default function LoginPage() {
    const [formUid, setFormUid] = useState("");
    const [formPwd, setFormPwd] = useState("");

    const [uid, setUid] = useUid();

    async function login() {
        const token = await runLogin(formUid, formPwd);
        if (!token) {
            toast.error("登录失败，请检查凭据。");
            return;
        }

        toast.success("登录成功！");

        console.log("Setting UID: " + formUid);
        setUid(formUid);
        setToken(token);
    }

    return <Card className="w-1/3">
        <CardBody className="flex flex-col gap-4 p-8 items-center">
            <h1 className="font-bold text-2xl mb-4">LC3XT · 登录</h1>
            <Input placeholder="用户 ID" value={formUid} onValueChange={setFormUid}/>
            <Input type="password" placeholder="密码" value={formPwd} onValueChange={setFormPwd}/>
            <Button color="primary" onPress={login} fullWidth>开始唤醒</Button>
        </CardBody>
    </Card>;
}