import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import React from "react";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit">LC-3 &times; USTC</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                <div className="flex items-center gap-2 font-bold">
                                    {React.createElement(item.icon)}
                                    {item.label}
                                </div>
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>
        </NextUINavbar>
    );
};
