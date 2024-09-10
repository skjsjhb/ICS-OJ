import { BeakerIcon } from "@primer/octicons-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "LC3XT · LC-3 评测姬",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      icon: BeakerIcon,
      label: "评测",
      href: "/oj",
    },
  ],
  benchAPI: "https://lc3xt.skjsjhb.moe:24462/oj",
};
