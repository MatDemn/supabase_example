import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import ProfileButton from "./ProfileButton";
import { api } from "@/trpc/server";
import { getAuth } from "@/utils/supabase/authProfile";

export const revalidate = 60;

const AuthComponent = async () => {
  const user = await getAuth();
  if(!!user) {
    const profile = await api.profiles.get({id: user.id});
    return(
      <ProfileButton user={user} profile={profile} />
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link href={"/login"} className="w-full sm:w-auto">
        <Button variant="secondary" size="sm" className="w-full">
          Log In
        </Button>
      </Link>
    </div>
  );
};

export default AuthComponent;