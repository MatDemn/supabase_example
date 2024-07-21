"use client";

import { RoomWithProfiles } from "@/types";
import { Tables } from "@/types/supabase";
import { type Room } from "@prisma/client";
import { useEffect } from "react";

interface GameInProgressProps {
    room: Tables<"room">;
}

const GameInProgress = ({room} : GameInProgressProps) => {
    function onKeyStroke(ev : KeyboardEvent) {
        console.log(`keystroke! ${ev.key}`);
    }
    
    useEffect(() =>{
    document.addEventListener("keydown", onKeyStroke);
    return () => document.removeEventListener("keydown", onKeyStroke);
    }, [])

    return ( 
        <div>
            game in progress... {room.id}
        </div>
     );
}
 
export default GameInProgress;