"use client";

import { redirect, useRouter } from "next/navigation";
import ParticipantEntry from "./participant-entry";
import { RealtimePresenceJoinPayload, RealtimePresenceLeavePayload } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { type Tables } from "@/types/supabase";
import { ArrowBigLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { useRoomProfiles } from "@/lib/store/roomProfiles";
import { useProfile } from "@/lib/store/profile";
import { useUser } from "@/lib/store/user";
import { toast } from "sonner";

interface RoomLobbyProps {
    room: Tables<"room">;
}

enum LobbyEvents { 
    user_join = "join",
    user_leave = "leave",
    start_game = "start_game",
}

interface UserConnectDisconnectPayload {
    profile : Tables<'profile'>,
    online_at: string,
}

const RoomLobby = ({ room }: RoomLobbyProps) => {
    const {roomProfileList, appendProfile, removeProfile} = useRoomProfiles((state) => state);
    //const roomProfileList: Tables<'profile'>[] = [];
    //const appendProfile = (xo: Tables<'profile'>) => {};
    //const removeProfile = (xo: Tables<'profile'>) => {};
    const profile = useProfile((state) => state.profile);
    const user = useUser((state) => state.user);

    const router = useRouter();
    if(!room || !user || !profile) {
        router.push("/");
    }

    const { mutate: removeUserMutate } = api.rooms.removeUser.useMutation({
        onSuccess: () => {
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { mutate: updateOwnerMutate } = api.rooms.updateOwner.useMutation({
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { mutate: deleteRoomMutate } = api.rooms.deleteRoom.useMutation({
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onLeave = async () => {
        if(room.owner_id == user?.id) {
            // Is owner
            const newOwner = roomProfileList.find(p => p.id != user.id);
            if(!!newOwner) {
                console.log("New owner found");
                updateOwnerMutate({room_id: room.id, owner_id: newOwner.id});
            }
            else {
                console.log("No new owner found");
                deleteRoomMutate({room_id: room.id});
            }
        }
        else {
            console.log("Not owner, remove him");
            removeUserMutate({user_id: user?.id ?? "", room_id: room.id});
        }
        router.push("/");
    }

    const onStartGame = async () => {
        // channel.send({
        //     type: 'broadcast',
        //     event: LobbyEvents.start_game,
        // })
        
    }

    const userStatus = {
        profile: profile,
        online_at: new Date().toISOString(),
    }

    useEffect(() => {
        const roomChannel = "room_" + room.id;
        const supabase = createClient();
        const channel = supabase.channel(roomChannel);
        //console.log(roomChannel);
        channel
        .on('presence', { event: 'sync' }, () => {
        // const newState = channel.presenceState()
        //     console.log('sync', newState)
        })
        .on<UserConnectDisconnectPayload>(
            'presence', 
            { event: LobbyEvents.user_join }, 
            ({ key, newPresences }) => {
                if(!!newPresences[0]?.profile) {
                    console.log("new presence!", newPresences[0]?.profile);
                    appendProfile(newPresences[0]?.profile);
                }
            }
        )
        .on<UserConnectDisconnectPayload>(
            'presence', 
            { event: LobbyEvents.user_leave }, 
            ({ key, leftPresences }) => {
                if(!!leftPresences[0]?.profile) {
                    console.log("left presence!", leftPresences[0]?.profile);
                    removeProfile(leftPresences[0]?.profile);
                }
            }
        )
        // .on(
        //     'broadcast',
        //     { event: LobbyEvents.start_game},
        //     (payload) => {
        //         console.log("started game by the owner!");
        //     }
        // )
        .subscribe((status) => {
            if (status !== 'SUBSCRIBED') { 
                return;
            }
        
            const presenceTrackStatus = channel.track(userStatus).catch((e)=> {e});
            //console.log(presenceTrackStatus);
        })

        return () => {
            void channel.unsubscribe();
        };
    },[room]);

    return ( 
        <div className="w-screen h-screen bg-background">
            <div className="h-full flex flex-col">
                <div className="mx-auto text-center text-5xl p-4 flex flex-row w-full justify-between align-middle">
                    <div className="mr-auto my-auto flex justify-between align-middle">
                        <Button className="my-auto flex flex-row justify-between gap-2" onClick={onLeave}>
                            <ArrowBigLeft className="text-white w-5 h-5 my-auto " />
                            <div className="">Leave room</div>
                        </Button>
                    </div>
                    <div className="">
                        Room {room.id}
                    </div>
                </div>
                <div className="flex-1 bg-white/10 flex flex-row">
                    <div className="p-6">
                        <h2 className="text-5xl">Participants:</h2>
                        {roomProfileList.map((elem, index) => 
                            <ParticipantEntry key={`participant ${index}`} participant={elem} isOwner={elem.id == room.owner_id} isThisUser={user?.id === elem.id}/>
                        )}
                    </div>
                    <div className="p-6">
                        {user?.id == room.owner_id 
                        ? ( <>
                                <h2 className="text-5xl">Ready for the next round?</h2>
                                <Button onClick={onStartGame}>Start!</Button>
                            </>
                        )
                        : ( <>
                                <h2 className="text-5xl">Waiting for room host to start...</h2>
                            </>
                        )    
                        }
                        
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default RoomLobby;