"use client";

import { Tables } from "@/types/supabase";
import { Crown } from "lucide-react";
import { getSession } from "@/utils/supabase/authProfile";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

interface ParticipantEntryProps {
    participant: Tables<"profile">;
    isOwner: boolean;
    isThisUser: boolean;
}

const ParticipantEntry = ({participant, isOwner, isThisUser} : ParticipantEntryProps) => {
    return ( 
        <div className={cn("bg-card rounded-full p-4 flex flex-row gap-2", isThisUser ? "bg-blue-900" : "")}>
            {participant.display_name}
            {isOwner && 
                <Crown className="text-yellow-400"/>
            }
        </div>
     );
}
 
export default ParticipantEntry;