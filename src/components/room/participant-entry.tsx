"use client";

import { Tables } from "@/types/supabase";
import { Crown } from "lucide-react";
import { getSession } from "@/utils/supabase/authProfile";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { PlayerScores } from "@/types";

interface ParticipantEntryProps {
    playerScore: PlayerScores,
    isThisPlayer: boolean,
}

const ParticipantEntry = ({playerScore, isThisPlayer } : ParticipantEntryProps) => {
    return ( 
        <div className={cn("bg-card rounded-lg p-4 flex flex-col", isThisPlayer ? "bg-primary" : "")}>
            <div className="flex flex-row gap-2">
                <span>{playerScore.profile.display_name}</span>
            </div>
            <div>
                <div>
                    <span className="text-sm">Input: {playerScore.score.input}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="text-sm">WPM {playerScore.score.wordsPerMinute}</span>
                    <span className="text-sm">Accuracy {playerScore.score.accuracy}</span>
                </div>
            </div>
        </div>
     );
}
 
export default ParticipantEntry;