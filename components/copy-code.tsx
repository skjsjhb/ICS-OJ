"use client";

import { Button } from "@heroui/button";
import { CopyIcon } from "@primer/octicons-react";
import { toast } from "react-toastify";

export default function CopyCode({ data }: { data: string; }) {
    function copyCode() {
        void navigator.clipboard.writeText(data);
        toast.info("代码已复制。");
    }

    return <Button
        color="primary"
        onPress={copyCode}
    >
        <div className="flex items-center gap-2">
            <CopyIcon/>
            复制源代码
        </div>
    </Button>;
}
