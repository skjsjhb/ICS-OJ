"use client";

import { useState } from "react";
import { runLogin } from "@/app/actions/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";

export default function LoginPage() {
    const [formUid, setFormUid] = useState("");
    const [formPwd, setFormPwd] = useState("");

    const [cookies, , removeCookie] = useCookies(["uid"]);
    const uid = cookies.uid ?? "";

    async function login() {
        const token = await runLogin(formUid, formPwd);
        if (!token) {
            toast.error("登录失败，请检查凭据。");
            return;
        }

        toast.success("登录成功！");
    }

    function logout() {
        removeCookie("uid");
        location.reload();
    }

    if (uid) {
        // Show the welcome page
        return <Card className="w-1/3">
            <CardBody className="flex flex-col gap-4 items-center p-8">
                <h1 className="text-2xl font-bold">欢迎回到 LC-3 评测姬！</h1>
                <p>您的用户 ID：{uid}</p>
                <Button fullWidth color="primary" as={Link} href="/oj">前往评测</Button>
                <Button fullWidth as={Link} href="/setpwd">修改密码</Button>
                <Button fullWidth onPress={logout} color="danger">注销</Button>
            </CardBody>
        </Card>;
    }

    // Default login form
    return <Card className="w-1/3">
        <CardBody className="flex flex-col gap-4 p-8 items-center">
            <h1 className="font-bold text-2xl mb-4">用户登录</h1>
            <Input placeholder="用户 ID" value={formUid} onValueChange={setFormUid}/>
            <Input type="password" placeholder="密码" value={formPwd} onValueChange={setFormPwd}/>
            <Button color="primary" onPress={login} fullWidth>开始唤醒</Button>
        </CardBody>
    </Card>;
}