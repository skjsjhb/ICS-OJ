import { BeakerIcon, PersonIcon } from "@primer/octicons-react";

export const siteConfig = {
    name: "LC3XT · LC-3 评测姬",
    description: "RUN / TEST / PROFILE",
    navItems: [
        {
            icon: BeakerIcon,
            label: "评测",
            href: "/oj"
        },
        {
            icon: PersonIcon,
            label: "用户登录",
            href: "/auth/login"
        }
    ],
    benchAPI: "http://localhost:7901"
};
