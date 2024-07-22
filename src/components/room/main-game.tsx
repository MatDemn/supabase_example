"use client";

import { useProfile } from "@/lib/store/profile";
import { useUser } from "@/lib/store/user";
import { useState, useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Tables } from "@/types/supabase";
import { io, Socket } from "socket.io-client";
import { env } from "@/env";
import { RoomState, Score, type PlayerScores } from "@/types";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";
import ParticipantEntry from "./participant-entry";
import { Input } from "../ui/input";
import { formatTime } from "@/utils/formatTime";

const MainGame = ({roomId}: {roomId: string}) => {
    const [playersScores, setPlayersScores] = useState<PlayerScores[]>([]);
    const [userInput, setUserInput] = useState("");
    const [gameSentence, setGameSentence] = useState("");
    const profile = useProfile((state) => state.profile);
    const user = useUser((state) => state.user);
    const [roomState, setRoomState] = useState<RoomState>("NOT_STARTED");
    const [gameTime, setGameTime] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);

    const [socketIO, setSocketIO] = useState<Socket>();
    
    const {toast} = useToast();
    const router = useRouter();

    if(!user || !profile) {
        return "";
    }

    const onLeave = async () => {
        if(!socketIO) return;
        socketIO.emit("player-leave");
        router.push("/");
    }

    const onStartGame = async () => {
        if(!socketIO) return;
        socketIO.emit("start-new-game");
    }

    const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let currentCorrect = 0;
        for(let i = 0; i < e.target.value.length; i++) {
            if(e.target.value[i] === gameSentence[i]) {
                currentCorrect++;
            }
            else {
                break;
            }
        }
        setCorrectChars(currentCorrect);
        setUserInput(e.target.value);
    }

    window.onbeforeunload = () => {
        if (socketIO) {
            socketIO.emit("player-leave");
        }
      };

    useEffect(() => {

        const socket = io(env.NEXT_PUBLIC_WEBSOCKET_URL);
        setSocketIO(socket);
        socket.emit("join-room", roomId, profile);

        return () => {
            if(!socketIO) return;
            clearListeners();
            socket.disconnect();
        }

    }, []);

    useEffect(() => {
        initListeners();
        return () => clearListeners();
    }, [socketIO]);

    useEffect(() => {
        if(roomState !== "IN_PROGRESS" || !socketIO) return;

        socketIO.emit("player-typing", userInput);
    }, [userInput])

    const initListeners = () => {
        if(!socketIO) return;

        socketIO.on("players", (playersScores: PlayerScores[]) => {
            setPlayersScores(playersScores);
        });

        socketIO.on("player-join", (player: Tables<'profile'>, socket_id: string) => {
            console.log("profile-join: ", player, socket_id);
            const newPlayer : PlayerScores = {profile: player, score: {input: "", wordsPerMinute: 0, accuracy: 0}, socket_id: socket_id};
            console.log(playersScores);
            console.log(newPlayer);
            setPlayersScores(prevPlayerScores => [...prevPlayerScores.filter(p => p.profile.id != player.id), newPlayer]);
        });

        socketIO.on("player-left", (id: string) => {
            setPlayersScores((prevProfiles) => (prevProfiles.filter(p => p.socket_id != id)));
        });

        socketIO.on("player-score-updated", (socket_id: string, score: Score) => {
            setPlayersScores((prevPlayerScores) => 
                prevPlayerScores.map((p) => {
                    if(p.socket_id === socket_id) {
                        return {
                            ...p,
                            score
                        };
                    }
                    return p;
                })
            );
        });

        socketIO.on("game-started", (sentence: string) => {
            console.log("game started!");
            setGameSentence(sentence);
            setRoomState("IN_PROGRESS");
        });

        socketIO.on("time-passing", (milliseconds: number) => {
            setGameTime(milliseconds);
        });

        socketIO.on("game-finished", () => {
            setGameSentence("");
            setRoomState("COMPLETED");
            setUserInput("");
        });

        socketIO.on("error", (err) => {
            toast({
                variant: "destructive",
                description: err
            });
        })
    }

    const clearListeners = () => {
        if(!socketIO) return;

        socketIO.off("players");
        socketIO.off("player-join");
        socketIO.off("player-left");
        socketIO.off("player-score-updated");
        socketIO.off("game-started");
        socketIO.off("time-passing");   
        socketIO.off("game-finished");
        socketIO.off("error");
    }

    if(roomState === "NOT_STARTED" || roomState === "COMPLETED") {
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
                        Room {roomId}
                    </div>
                </div>
                <div className="flex-1 bg-white/10 flex flex-row">
                    <div className="p-6">
                        <h2 className="text-5xl">Participants:</h2>
                        {playersScores.map((playerScore, index) => 
                            <ParticipantEntry key={`participant ${index}`} playerScore={playerScore} isThisPlayer={user?.id === playerScore.profile.id}/>
                        )}
                    </div>
                    <div className="p-6">
                        <>
                            <h2 className="text-5xl">Ready for the next round?</h2>
                            <Button onClick={onStartGame}>Start!</Button>
                        </>
                    </div>
                </div>
            </div>
        </div>
     );
    }
    
    if (roomState === "IN_PROGRESS") {
    // Render gameplay
        return (
            <div className="flex flex-col w-screen h-screen">
                <div className="bg-card w-full h-24 flex flex-col">
                    <div className="flex justify-between items-center h-full px-6 py-4">
                            <Button className="my-auto flex flex-row justify-between gap-2">
                                <ArrowBigLeft className="text-white w-5 h-5 my-auto " />
                                <div className="">Leave room</div>
                            </Button>
                        <span className="text-3xl">{formatTime(gameTime)}</span>
                        <h2 className="text-2xl font-semibold">Game in Progress</h2>
                    </div>

                </div>
                <div className="flex-1 grid grid-cols-3">
                {playersScores.map((playerScore, index) => 
                            <ParticipantEntry key={`participant ${index}`} playerScore={playerScore} isThisPlayer={user?.id === playerScore.profile.id}/>
                        )}
                {playersScores.map((playerScore, index) => 
                            <ParticipantEntry key={`participant ${index}`} playerScore={playerScore} isThisPlayer={user?.id === playerScore.profile.id}/>
                        )}
                </div>
                <div className="flex-1 flex flex-col w-full bg-blue-300">
                    <div className="flex-1 p-3 bg-primary/20">
                        <div className="h-full flex justify-center align-middle">
                            <div className="my-auto text-3xl text-center">
                                <span className="text-green-500 bg-green-500/20">{gameSentence.substring(0,correctChars)}</span>
                                <span>{gameSentence.substring(correctChars, gameSentence.length)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="border:white min-h-4 w-full border-t-2 p-8">
                        <Input
                            placeholder="Type in a sentence from above as fast as you can!"
                            className="border:ring-0 focus-visible:ring-0"
                            onChange={(e) => onUserInput(e)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MainGame;