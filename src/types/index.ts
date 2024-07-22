import { Database, Tables } from "./supabase";

export type RoomState = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type Score = {
    input: string;
    wordsPerMinute: number;
    accuracy: number;
};

export type PlayerScores = {
    profile: Tables<'profile'>;
    score: Score;
    socket_id: string;
};