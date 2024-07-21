"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { type User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { type Tables } from "@/types/supabase";
import { Button } from "../ui/button";

interface ProfileButtonProps {
  user: User;
  profile: Tables<"profile">;
}

const ProfileButton = ({ user, profile }: ProfileButtonProps) => {
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const getUserInitials = () => {
    return profile.display_name.slice(0, 2);
  };

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-full flex-row items-center gap-3 px-3 py-2 pr-4 focus-visible:outline-none">
          <div className="flex flex-col rounded-lg bg-card">
            <span className="p-2 text-center font-bold">Logged in as:</span>
            <div className="flex flex-row gap-2 p-2">
              <Avatar className="my-auto hover:cursor-pointer">
                <AvatarImage
                  src={profile.avatar_url}
                  alt={"avatar of the user"}
                />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="h-full flex-1">
                <div className="font-bold">
                  {profile.display_name.length > 30
                    ? profile.display_name.slice(0, 30) + "..."
                    : profile.display_name}
                </div>
                <div className="rounded-full bg-slate-50 p-2 text-secondary">
                  {user.email ? user.email : ""}
                </div>
              </div>
              <EllipsisHorizontalIcon className="my-auto ml-auto h-10 w-10 rounded-full text-white transition hover:bg-slate-200 hover:text-primary" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="">
            <Button
              onClick={signOut}
              variant={"ghost"}
              className="flex flex-row gap-2 bg-transparent text-rose-600 focus:text-rose-500"
            >
              <span className="">Log out</span>
              <LogOut className="ml-auto" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
