import { BeakerIcon } from "@primer/octicons-react";

export type SiteConfig = typeof siteConfig;

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
  benchAPI: getBenchAPI(),
};

function getBenchAPI() {
  if (process.env.NODE_ENV === "production") {
    return "https://lc3xt.skjsjhb.moe:7900/oj";
  } else {
    return "http://localhost:7900/oj";
  }
}
