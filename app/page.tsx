import { Button } from "@nextui-org/button";
import { BeakerIcon, RepoIcon } from "@primer/octicons-react";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

import { title } from "@/components/primitives";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 w-full">
            <div className="flex flex-col justify-center items-center w-6/12">
                <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h1 className={title({ color: "cyan" })}>RUN</h1>
                        <h1 className={title({ color: "green" })}>TEST</h1>
                        <h1 className={title({ color: "pink" })}>PROFILE</h1>
                    </div>
                </div>

                <Divider className="my-8"/>

                <p className="text-3xl font-bold">LC-3 评测姬</p>
                <p className="mt-2 text-foreground-400">LC3XT / SUGAR</p>

                <div className="mt-8 py-2 px-4 border-2 border-foreground-400 rounded-lg">
                    <p className="text-foreground-500">
                        多评一遍&nbsp;&nbsp;安全保险&nbsp;&nbsp;多测一步&nbsp;&nbsp;少出错误
                    </p>
                </div>

                <div className="mt-8 w-9/12 flex flex-col gap-4 items-center">
                    <Button fullWidth as={Link} color="primary" href="/oj" size="lg">
                        <div className="flex items-center gap-2">
                            <BeakerIcon/>
                            评测实验
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
        </section>
    );
}
