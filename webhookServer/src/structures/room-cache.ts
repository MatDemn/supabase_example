import { Server } from "socket.io";
import { Profile } from "../types";
import { ExtendedTimer } from "../utils/timeoutTimePassed";

export interface Room {
    id: string;
    io: Server;
    owner: string;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    sentence: string;
    participants: {profile: Profile, score: {input: string, wordsPerMinute: number, accuracy: number}, socket_id: string} [];
    timer: ExtendedTimer | null;
    interval: NodeJS.Timeout | null;
}

export class RoomCache {
    cacheMap: Map<string,Room>;

    constructor() {
        this.cacheMap = new Map<string,Room>();
    }

    addRoom(id: string, io: Server, owner: string, participants: {profile: Profile, score: {input: string, wordsPerMinute: number, accuracy: number}, socket_id: string}[], timer: ExtendedTimer, interval: NodeJS.Timeout) {
        this.cacheMap.set(id, {id, io, owner, status: "NOT_STARTED", sentence: "", participants, timer, interval: interval });
    }

    removeRoom(id: string) {
        if(!this.cacheMap.has(id)) return;
        clearTimeout(this.cacheMap.get(id).timer.timer);
        clearInterval(this.cacheMap.get(id).interval);
        this.cacheMap.delete(id);
    }

    initSocketListeners(id: string) {
        this.cacheMap[id].io.on("start-game", (sentence: string) =>{
            if(this.cacheMap[id].status != "NOT_STARTED") {
                return this.cacheMap[id].io.emit("error", "Game is not in initial state");
            }

            this.cacheMap[id].participants.forEach(p => p.score = 0);

            this.cacheMap[id].io.emit("players-state", this.cacheMap[id].participants);

            this.cacheMap[id].status = "IN_PROGRESS";

            this.cacheMap[id].sentence = sentence;


        });
    }

    hasRoom(room_id: string): boolean {
        return this.cacheMap.has(room_id);
    }

    getRoom(room_id: string): Room | undefined {
        return this.cacheMap.get(room_id);
    }

    setRoom(room_id: string, room: Room): void {
        this.cacheMap.set(room_id, room);
    }
}