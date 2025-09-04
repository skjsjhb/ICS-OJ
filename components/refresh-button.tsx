"use client";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";

export function RefreshButton() {
    useEffect(() => {
        setTimeout(() => location.reload(), 5000);
    }, []);

    return <Button onPress={() => location.reload()}>立即刷新</Button>;
}
