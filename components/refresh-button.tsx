"use client";
import { useEffect } from "react";
import { Button } from "@heroui/button";

export function RefreshButton() {
    useEffect(() => {
        setTimeout(() => location.reload(), 5000);
    }, []);

    return <Button onPress={() => location.reload()}>立即刷新</Button>;
}
