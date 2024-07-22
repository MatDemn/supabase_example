import { createClientServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getAuth = async () => {
    const supabase = createClientServer(cookies());

    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    return user;
}

export const getSession = async () => {
    const supabase = createClientServer(cookies());

    const {
        data: { session },
    } = await supabase.auth.getSession();
    
    return session;
}