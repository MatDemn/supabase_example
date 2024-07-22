import { createClientServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { type RouterOutput } from "@/trpc/shared";
import { Tables } from "@/types/supabase";
import MainGame from "@/components/room/main-game";

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
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

  const roomId = params.roomId;
  //const room: Tables<"room"> = await api.rooms.get({ room_id: roomId });
  // const profiles: Tables<"profile">[] = (
  //   await api.profiles.getProfilesByRoomId({ room_id: roomId })
  // ).map((prof) => prof.profile) as Tables<"profile">[];
  // if (!room) {
  //   return <p>Room not found {roomId}</p>;
  // }
  // if (!profiles) {
  //   return <p>Corrupted room encountered. Try creating a new one.</p>;
  // }

  return <MainGame roomId={roomId} />
}
