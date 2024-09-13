import { BeakerIcon } from "@primer/octicons-react";

export const siteConfig = {
  name: "LC3XT · LC-3 评测姬",
  description: "RUN / TEST / PROFILE",
  navItems: [
    {
      icon: BeakerIcon,
      label: "评测",
      href: "/oj",
    },
  ],
  benchAPI: "http://localhost:7900/oj",
};
