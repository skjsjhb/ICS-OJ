"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { getToken, useUid } from "@/components/user";
import { updatePwd } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function SetPwdPage() {
    const [formPwd, setFormPwd] = useState("");
    const router = useRouter();

    const [uid] = useUid();

    if (!uid) return "";

    async function setPwd() {
        const ok = await updatePwd(uid, formPwd, getToken());
        if (!ok) {
            toast.error("无法修改密码，请检查凭据。");
            return;
        }

        toast.success("已更新密码。");
        router.push("/login");
    }

    return <Card className="w-1/3">
        <CardBody className="flex flex-col gap-4 p-8 items-center">
            <h1 className="font-bold text-2xl mb-4">更新密码</h1>
            <Input value={uid} isDisabled/>
            <Input type="password" placeholder="新密码" value={formPwd} onValueChange={setFormPwd}/>
            <Button color="primary" onPress={setPwd} fullWidth>修改密码</Button>
        </CardBody>
    </Card>;
}