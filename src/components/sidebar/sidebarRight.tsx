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

const SidebarRight: React.FC<{ children: React.ReactNode}> = ({children}) => {
    return (
      <>
        <div className="sticky top-0 flex flex-col">
          <div className="flex flex-col w-20 sm:w-80 py-1 items-start gap-1 bg-background ">
            {children}
          </div>
        </div>
      </>
    );
};

export default SidebarRight;