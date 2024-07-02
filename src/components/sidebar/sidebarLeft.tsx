"use client";

import Link from "next/link";
import React , { useState} from "react";
import {XMarkIcon, Bars3Icon, ArchiveBoxIcon, HomeIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, BellAlertIcon, EnvelopeIcon, PencilIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import {Button} from "@/components/ui/button";
import SidebarElement from "./sidebar-element";
import { Activity, Home, Search } from "lucide-react";
import { Separator } from "../ui/separator";


const routes: { Icon: React.ElementType, label: string, href: string} [] = [
    { Icon: HomeIcon, label: "Homepage", href: "/"},
    { Icon: PencilIcon, label: "Posts", href: "/posts"},
    { Icon: UserCircleIcon, label: "Profile", href: "/profile"},

];

const SidebarLeft: React.FC<{ children: React.ReactNode}> = ({children}) => {
    return (
      <>
        <div className="sticky top-0 flex flex-col">
          <div className="flex flex-col w-20 sm:w-60 py-1 items-start gap-1 bg-background ">
            <SidebarElement 
              Icon={Activity}
              label=""
              href="/"
            />
            {routes.map((route, index) => (
              <SidebarElement 
                key={index} 
                Icon={route.Icon} 
                label={route.label} 
                href={route.href} 
              />
            ))}
          </div>
          <div className="">
            <Separator className="w-full bg-secondary mt-auto" />
            <div className="w-full h-16 flex flex-row items-center justify-center p-2">
              {children}
            </div>
          </div>
        </div>
      </>
    );
};

export default SidebarLeft;