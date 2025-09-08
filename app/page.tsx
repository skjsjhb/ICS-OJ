import { BeakerIcon, RepoIcon } from "@primer/octicons-react";
import Link from "next/link";

import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

export default async function Home() {
    const apiVersion = await (
        await fetch(siteConfig.benchAPI + "/commit", { cache: "no-cache" })
    ).text();

    return (
        <div className="w-full h-full grid">
            <div className="flex flex-col items-center justify-center gap-4 w-5/6 mx-auto my-auto">
                <div className="flex w-1/2 justify-between gap-2">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className={title({ color: "cyan" })}>RUN</div>
                            <div className={title({ color: "green" })}>TEST</div>
                            <div className={title({ color: "pink" })}>PROFILE</div>
                        </div>
                    </div>

                    <div className="flex">
                        <Divider orientation="vertical" className="h-2/3 my-auto"/>
                    </div>

                    <div className="flex flex-col items-center gap-1 justify-center min-w-fit">
                        <p className="text-3xl font-bold mb-4">LC-3 评测姬</p>
                        <p className="text-foreground-400">LC3XT / NYA</p>
                        <p className="text-foreground-400">Build {apiVersion}</p>
                    </div>
                </div>

                <div className="mt-12 w-2/3 flex gap-4">
                    <Button fullWidth as={Link} color="primary" href="/oj" size="lg">
                        <div className="flex items-center gap-2">
                            <BeakerIcon/>
                            代码评测
                        </div>
                    </Button>

                    <Button fullWidth as={Link} href="https://lc3.skjsjhb.moe" size="lg">
                        <div className="flex items-center gap-2">
                            <RepoIcon/>
                            LC-3 大抄
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}
