import { createClientServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewGameForm from "@/components/main/new-game-form";
import JoinGameForm from "@/components/main/join-game-form";
import AuthComponent from "@/components/auth/AuthComponent";
import InitUser from "@/lib/store/Inits/InitUser";
import { api } from "@/trpc/server";

export default async function AuthButton() {
  const supabase = createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await api.profiles.get({ id: user.id });

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full flex-col">
        <div className="flex p-6">
          <span className="mx-auto text-center text-7xl font-bold">
            Typeracer game!
          </span>
        </div>
        <div className="m-auto flex flex-col justify-center">
          <div className="rounded-xl p-12">
            <div className="mb-12 flex justify-center">
              <h2 className="text-center text-3xl">
                Compete with your friends and family in this challenging typing
                game!
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-2 md:flex-row">
              <NewGameForm />
              <JoinGameForm />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <AuthComponent />
            </div>
          </div>
        </div>
      </div>
      <InitUser user={user} profile={profile} />
    </div>
  );
}
