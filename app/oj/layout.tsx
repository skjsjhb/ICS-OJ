import { ReactNode } from "react";

export default function OJLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-full">
            {children}
        </div>
    );
}
