import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ClientCookiesProvider } from "@/components/cookies-provider";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.png"
    }
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" }
    ]
};

export default async function RootLayout({ children }: {
    children: ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="zh-CN">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body
            className={clsx(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <ToastContainer
            closeOnClick
            newestOnTop
            pauseOnFocusLoss
            pauseOnHover
            autoClose={3000}
            hideProgressBar={false}
            limit={5}
            position="top-right"
            rtl={false}
            theme="dark"
        />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <ClientCookiesProvider>
                <div className="w-full h-screen flex flex-col">
                    <Navbar/>
                    <div className="my-auto grow min-h-0">
                        {children}
                    </div>
                </div>
            </ClientCookiesProvider>
        </Providers>
        </body>
        </html>
    );
}
