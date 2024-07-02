import { createClient } from "@/utils/supabase/server";
import { PremiumClass } from "@prisma/client";
import { cookies } from "next/headers";
import {publicProcedure} from '@/server/api/trpc';
import {api} from "@/trpc/server";
import { Button } from "../ui/button";
import Link from "next/link";

const SidebarPremium = async () => {
    const supabase = createClient(cookies());

    const {
        data: { user },
    } = await supabase.auth.getUser();
  
    return (
        <div className="m-2 p-3 w-full min-h-52 
        rounded-lg border-2 border-gray-500 
        flex flex-col align-middle justify-center
        text-center
        ">
            {!user ? (
                <div>
                    This is some premium content!
                </div>
            ) : (
                <div className="flex flex-col space-y-4 ">
                    <div>You want some premium content? Buy premium now!</div>
                    <Link href={"/premium"}>
                        <Button>
                            Buy premium!
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
        
}
 
export default SidebarPremium;