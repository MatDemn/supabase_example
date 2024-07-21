"use client";

import { useEffect, useRef } from "react";
import { useUser } from "./user";
import { type User } from "@supabase/supabase-js";
import { useProfile } from "./profile";
import { type Tables } from "@/types/supabase";

const InitUser = ({user, profile}: {user: User | undefined, profile: Tables<'profile'> | undefined}) => {
    const initState = useRef(false);
    useEffect(() => {
        if(!initState.current) {
            useUser.setState({ user });
            useProfile.setState({ profile });
        }
        initState.current = true;
    // eslint-disable-next-line
    }, [])
    
    return <></>;
}
 
export default InitUser;