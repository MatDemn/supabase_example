import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getAuth = async () => {
    const supabase = createClient(cookies());

    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    return user;
}

export const getSession = async () => {
    const supabase = createClient(cookies());

    const {
        data: { session },
    } = await supabase.auth.getSession();
    
    return session;
}