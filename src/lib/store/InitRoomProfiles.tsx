"use client";

import { useEffect, useRef } from "react";
import { type Tables } from "@/types/supabase";
import { useRoomProfiles } from "./roomProfiles";

const InitRoomProfiles = ({allProfiles}: {allProfiles: Tables<'profile'>[]}) => {
    const initState = useRef(false);
    useEffect(() => {
        if(!initState.current) {
            useRoomProfiles.setState({ roomProfileList: allProfiles })
        }
        initState.current = true;
    // eslint-disable-next-line
    }, [])
    
    return <></>;
}
 
export default InitRoomProfiles;