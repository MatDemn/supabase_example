import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RandomWordContent from "@/components/content/random-word-content";
import MainTypingInput from "@/components/content/main-typing-input";
import { api } from "@/trpc/server";
import { type RouterOutput } from "@/trpc/shared";
import { RoomState } from "@prisma/client";
import RoomLobby from "@/components/room/room-lobby";
import GameInProgress from "@/components/room/game-in-progress";
import { Tables } from "@/types/supabase";
import InitRoomProfiles from "@/lib/store/InitRoomProfiles";

type RoomByIdOutput = RouterOutput["rooms"]["get"];

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const roomId = params.roomId;
  const room: Tables<"room"> = await api.rooms.get({ room_id: roomId });
  const profiles: Tables<"profile">[] = (
    await api.profiles.getProfilesByRoomId({ room_id: roomId })
  ).map((prof) => prof.profile) as Tables<"profile">[];
  if (!room) {
    return <p>Room not found {roomId}</p>;
  }
  if (!profiles) {
    return <p>Corrupted room encountered. Try creating a new one.</p>;
  }

  if (room.room_state === RoomState.NOT_STARTED) {
    // Render a lobby
    return (
      <>
        <RoomLobby room={room} />
		    <InitRoomProfiles allProfiles={profiles || []} />
      </>
    );
  }

  if (room.room_state === RoomState.IN_PROGRESS) {
    // Render a game
    if (!profiles.find((elem) => elem.id == user.id)) {
      redirect("/");
    } else {
      return <GameInProgress room={room} />;
    }
  }

  // Render a scoreboard

  return (
    <div className="h-screen">
      <div className="flex h-full flex-col">
        <RandomWordContent />
        <MainTypingInput />
      </div>
    </div>
  );
}
