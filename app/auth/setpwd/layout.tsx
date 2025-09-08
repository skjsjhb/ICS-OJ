import { ReactNode } from "react";

export default function SetPwdPageLayout({ children }: { children: ReactNode }) {
    return <div className="grid grid-cols-1 grid-rows-1 h-full place-items-center">{children}</div>;
}