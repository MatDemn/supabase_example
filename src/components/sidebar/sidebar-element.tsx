"use client";

import Link from "next/link";
import React , { useEffect, useState} from "react";
import {XMarkIcon, Bars3Icon} from "@heroicons/react/24/solid";
import {Button} from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { cn } from "@/lib/utils";

interface SidebarElementProps {
    Icon?: React.ElementType,
    label?: string,
    href: string,
    className?: string,
}

const SidebarElement: React.FC<SidebarElementProps> = ({Icon, label, href} : SidebarElementProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className="h-16 rounded-full hover:bg-gray-700 transition duration-200">
                    <div className="h-full w-full flex flex-row items-center justify-start gap-3 py-3 px-5">
                        {Icon ? 
                            <Icon className="h-full" /> 
                            : null
                        }
                        {label != "" ? 
                            (<p className="hidden sm:flex-1 sm:block">
                                {label}
                            </p>) : null
                        }
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent side="right" className={cn("w-50", label ? "" : "hidden")}>{label}</HoverCardContent>
        </HoverCard>
    );
};

export default SidebarElement;