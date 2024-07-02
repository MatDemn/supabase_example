"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const ProfileButton: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const getUserInitials = (user: User) => {
    return user.id.slice(0,2);
  }

  if (!user) return null;
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full flex flex-row gap-3 items-center hover:bg-slate-600 px-3 py-2 pr-4 rounded-full transition">
          <Avatar
          className="hover:cursor-pointer">
            <AvatarImage src={
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              user.user_metadata.avatar_url+"xoxo"
            }
            />
            <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
          </Avatar>
          <div className="h-full flex-1 hidden sm:block">
            <div className="font-bold">{user.id.length > 10 ? user.id.slice(0,10)+"..." : user.id}</div>
            <div className="text-secondary">{user.email ? user.email : ""}</div>
          </div>
          <EllipsisHorizontalIcon className="text-white w-5 h-5 ml-auto hidden sm:block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="text-rose-600 focus:text-rose-500">
            Log out
            <LogOut className="ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;