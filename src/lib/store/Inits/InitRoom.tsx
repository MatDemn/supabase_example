"use client";

import { useEffect, useRef } from "react";
import { type User } from "@supabase/supabase-js";
import { type Tables } from "@/types/supabase";
import { useRoom } from "../room";

const InitRoom = ({room}: {room: Tables<'room'> | undefined}) => {
    const initState = useRef(false);
    useEffect(() => {
        if(!initState.current) {
            useRoom.setState({ room });
        }
        initState.current = true;
    // eslint-disable-next-line
    }, [])
    
    return <></>;
}
 
export default InitRoom;