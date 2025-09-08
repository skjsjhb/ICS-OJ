"use client";

import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

export function ClientCookiesProvider({ children }: { children: ReactNode }) {
    return <CookiesProvider>
        {children}
    </CookiesProvider>;
}